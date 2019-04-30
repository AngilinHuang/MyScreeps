var creepUtil = require('creepUtil');

/*
 * roleWarCharger功能
 * 用于进攻时快速填充extension和防守时快速填充tower
 * 
 * 工作优先级
 * 1、用能量填满房间内最近的spawn，extension，tower(能量小于800)   锁定目标直到供能完毕
 * 采集优先级
 * 1、从最近的link，container，storage获得能量
 * 
 * Game.spawns['Spawn3'].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'WarCharger'+Game.time,{memory: {role: 'warCharger', room:'W15S18'}});
 * 
 */
var roleWarCharger = {

    run: function(creep) {
    	if(!creepUtil.checkRoom(creep)){
    		return;
    	}
    	
        if(creep.memory.charging && creep.carry.energy == 0) {
            creep.memory.charging = false;
        }
        if(!creep.memory.charging && creep.carry.energy == creep.carryCapacity) {
            creep.memory.charging = true;
        }

        if(creep.memory.charging) {
        	let target;
        	let targetId = creep.memory.targetId;
        	if(targetId){
        		const memoryTarget = Game.getObjectById(targetId);
        		if(memoryTarget && structure.energy < structure.energyCapacity){
        			target = memoryTarget;
        		}
        		else{
        			creep.memory.targetId = undefined;
        		}
        	}
        	else{
        		creep.memory.targetId = undefined;
        	}
        	
        	if(!target){
                target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_EXTENSION 
                        		|| structure.structureType == STRUCTURE_SPAWN) &&
                        		structure.energy < structure.energyCapacity)
                            || (structure.structureType == STRUCTURE_TOWER &&
                            		structure.energy < 800)
                            ;
        	            }
        	    });
        	}
        	
    	    if(target) {
    	        if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    	            creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
    	        }
    	    }
        }
        else {
        	creepUtil.getEnergyFromClosestStructure(creep);
        }
    }
};

module.exports = roleWarCharger;