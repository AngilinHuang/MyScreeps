var creepUtil = require('creepUtil');

/*
 * harvester功能
 * 工作优先级
 * 1、如果3格内有link或storage或container，将能量放入该建筑
 * 2、用能量填满房间内最近的spawn，extension，tower，storage
 * 采集优先级
 * 1、从3格内有能量的tombstone获取能量
 * 2、从当前房间内最近的有能量的source采集
 * 
 */
var roleHarvester = {
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
        		creepUtil.harvestClosestEnergy(creep);
        	}
        }
        else {
        	let target;
        	const targets = creep.pos.findInRange(FIND_STRUCTURES, 3, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_LINK &&
                        structure.energy < structure.energyCapacity)
                        ||(structure.structureType == STRUCTURE_STORAGE);
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
                            		_.sum(structure.store)<structure.storeCapacity);
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