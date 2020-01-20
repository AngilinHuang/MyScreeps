var creepUtil = require('creepUtil');

/*
 * harvester功能
 * 工作优先级
 * 1、如果1格内有link，将能量放入该建筑
 * 2、如果2格内有link或storage或container，将能量放入该建筑
 * 3、用能量填满房间内最近的spawn，extension，tower，storage
 * 采集优先级
 * 1、从3格内有能量的tombstone获取能量
 * 2、从指定source采集（配合autoCreateCreep的为能量点平均分配harvester功能，目前设置为采光指定能量点后不会跑去另一个采集点）
 * 3、从当前房间内最近的有能量的source采集
 * 
 */
var roleHarvester = {
    run: function(creep) {

    	if(!creepUtil.checkRoom(creep)){
    		return;
    	}
    	
    	if(creep.memory.opt && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.opt = false;
        }
        if(!creep.memory.opt && creep.store[RESOURCE_ENERGY] == creep.store.getCapacity()) {
            creep.memory.opt = true;
        }
    	
        if(!creep.memory.opt) {
        	if(!creepUtil.harvestNearbyTombstone(creep)){
        		if(creep.memory.sourceId){
        			const source = Game.getObjectById(creep.memory.sourceId);
        			if(source && source.energy>0){
        				if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
        				    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffffff'}});
        				}
        				return;
        			}
        		}
        		else{
        			creepUtil.harvestClosestEnergy(creep);
        		}
        	}
        }
        else {
        	let target;
        	let targets = creep.pos.findInRange(FIND_STRUCTURES, 1, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_LINK &&
                        structure.store[RESOURCE_ENERGY] < structure.store.getCapacity(RESOURCE_ENERGY));
                }
        	});
        	if(!targets||targets.length==0){
        		targets = creep.pos.findInRange(FIND_STRUCTURES, 2, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_LINK &&
                            structure.store[RESOURCE_ENERGY] < structure.store.getCapacity(RESOURCE_ENERGY))
                            ||(structure.structureType == STRUCTURE_STORAGE)
                            ||(structure.structureType == STRUCTURE_CONTAINER &&
                            		creep.store.getUsedCapacity()<structure.store.getCapacity());
                    }
            	});
        	}
        	if(targets && targets.length>0){
        		target = targets[0];
        	}
        	else{
        		target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_EXTENSION 
                        		|| structure.structureType == STRUCTURE_SPAWN
                        		|| structure.structureType == STRUCTURE_TOWER) &&
                        		structure.store[RESOURCE_ENERGY] < structure.store.getCapacity(RESOURCE_ENERGY))
                            || structure.structureType == STRUCTURE_STORAGE
                            || (structure.structureType == STRUCTURE_CONTAINER &&
                            		creep.store.getUsedCapacity()<structure.store.getCapacity())
                            ||(structure.structureType == STRUCTURE_LINK &&
                            		structure.store[RESOURCE_ENERGY] < structure.store.getCapacity(RESOURCE_ENERGY));
                    }
        		});
        	}
            if(target) {
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else{
            	creepUtil.tryToUpgrade(creep);
            }
        }
    }
};

module.exports = roleHarvester;