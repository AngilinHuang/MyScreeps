var creepUtil = require('creepUtil');


/*
 * repairer功能
 * 工作优先级
 * 1、修理除了墙和rampart以外的血量不满70%的建筑到满血
 * 2、修理墙和rampart的血量到wallHitsLimit（最低100K，随着room controller等级的提高而提高）
 * 3、为spawn，extension，tower供能
 * 4、升级当前房间的room controller
 * 采集优先级
 * 1、如果房间内有tombstone存在且有能量，从tombstone采集能量
 * 2、从距离4格内的link、container、storage获取能量
 * 3、从当前房间内最近的有能量的source采集
 * 
 */
var roleRepairer = {

    run: function(creep) {
    	if(creepUtil.evadeHostiles(creep)){
    		return;
    	}
    	if(!creepUtil.checkRoom(creep)){
    		return;
    	}
    	
        if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
        }
        if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.repairing = true;
        }
        
        //100K  cost 1K energy
        let wallHitsLimit = 100000;
        //rampartMaxHit:level4=3000000;level5=10000000;level6=30000000;level7=100000000;level8=300000000;
        if(creep.room.controller.level==5){
        	wallHitsLimit = 100000;
        }
        else if(creep.room.controller.level==6){
        	wallHitsLimit = 100000;
        }
        else if(creep.room.controller.level==7){
        	wallHitsLimit = 200000;
        }
        else if(creep.room.controller.level==8){
        	wallHitsLimit = 1000000;
        }

        if(creep.memory.repairing) {
        	let target;
        	let targetId = creep.memory.targetId;
        	if(targetId!=undefined && Game.getObjectById(targetId)!=undefined){
        		const memoryTarget = Game.getObjectById(targetId);
        		if((memoryTarget.hits < memoryTarget.hitsMax
        			&& memoryTarget.structureType!=STRUCTURE_RAMPART)
        			||(memoryTarget.hits < (wallHitsLimit+10000)
        			&& memoryTarget.structureType==STRUCTURE_RAMPART)){
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
            }
            else{
            	target = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => structure.hits < wallHitsLimit && (structure.structureType==STRUCTURE_WALL || structure.structureType==STRUCTURE_RAMPART)});
            	if(target) {
            		if(target.structureType==STRUCTURE_RAMPART){
            			creep.memory.targetId = target.id;
            		}
                    if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            	else{
            		if(!creepUtil.transferEnergyToSpawnAndTower(creep)){
            			creepUtil.tryToUpgrade(creep);
            		}
            	}
            }
        }
        else {
        	if(!creepUtil.harvestTombstone(creep)){
	        	if(!creepUtil.getEnergyFromClosestStructure(creep)){
	        		creepUtil.harvestClosestEnergy(creep);
	        	}
        	}
        }
    }
};

module.exports = roleRepairer;