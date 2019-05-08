var creepUtil = require('creepUtil');

/*
 * ReserveHarvester功能
 * 工作优先级
 * 1、修理70%血以下的建筑
 * 2、如果3格内有link或storage或container，将能量放入该建筑
 * 3、用能量填满房间内最近的储能建筑
 * 采集优先级
 * 1、从3格内有能量的tombstone获取能量
 * 2、如果指定了能量点，从指定能量点采集
 * 3、从当前房间内最近的有能量的source采集
 * 
 */
var roleReserveHarvester = {
    run: function(creep) {
    	if(creepUtil.evadeHostiles(creep)){
    		return;
    	}
    	if(!creepUtil.checkRoom(creep)){
    		return;
    	}
    	
    	if(creep.memory.opt && creep.carry.energy == 0) {
            creep.memory.opt = false;
        }
        if(!creep.memory.opt && creep.carry.energy == creep.carryCapacity) {
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
        	//reserveHarvester需要自己修理container和road
        	let target;
        	let targetId = creep.memory.targetId;
        	if(targetId!=undefined && Game.getObjectById(targetId)!=undefined){
        		const memoryTarget = Game.getObjectById(targetId);
        		if(memoryTarget.hits < memoryTarget.hitsMax
        			&& memoryTarget.structureType!=STRUCTURE_RAMPART && memoryTarget.structureType!=STRUCTURE_WALL ){
        			target = Game.getObjectById(targetId);
        		}
        		else{
        			creep.memory.targetId = undefined;
        		}
        	}
        	else{
        		creep.memory.targetId = undefined;
        	}
        	
        	if(!target){
                target = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => structure.hits < 0.7*structure.hitsMax && structure.structureType!=STRUCTURE_WALL && structure.structureType!=STRUCTURE_RAMPART});
        	}
            if(target) {
            	creep.memory.targetId = target.id;
                if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
                return;
            }
        	//把能量放入container
        	let targets = creep.pos.findInRange(FIND_STRUCTURES, 3, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_LINK &&
                            structure.energy < structure.energyCapacity)
                            ||(structure.structureType == STRUCTURE_STORAGE)
                            ||(structure.structureType == STRUCTURE_CONTAINER &&
                                	_.sum(structure.store)<structure.storeCapacity);
                    }
            	});
        	if(targets && targets.length>0){
        		target = targets[0];
        	}
        	else{
        		target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_EXTENSION 
                        		|| structure.structureType == STRUCTURE_SPAWN
                        		|| structure.structureType == STRUCTURE_TOWER) &&
                            structure.energy < structure.energyCapacity)
                            || structure.structureType == STRUCTURE_STORAGE
                            || (structure.structureType == STRUCTURE_CONTAINER &&
                            		_.sum(structure.store)<structure.storeCapacity)
                            ||(structure.structureType == STRUCTURE_LINK &&
                                    structure.energy < structure.energyCapacity);
                    }
        		});
        	}
            if(target) {
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }
};

module.exports = roleReserveHarvester;