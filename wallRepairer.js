var creepUtil = require('creepUtil');


/*
 * wallRepairer功能
 * 负责平均的将墙和rampart的血量修理到极限
 * 大容量单位
 * 
 * 风险在于挡路，需要避免在storage到wall的路上，三格距离处会挡路的情况
 * 
 * 工作优先级
 * 1、修理血量最低的墙和rampart，锁定目标直到当前creep的能量用完
 * 采集优先级
 * 1、从3格内有能量的tombstone获取能量
 * 2、从storage获取能量
 * 3、从最近的有能量的link、container、storage获取能量
 * 4、从当前房间内最近的有能量的source采集
 * 
 */
var roleWallRepairer = {

    run: function(creep) {

    	if(!creepUtil.checkRoom(creep)){
    		return;
    	}
    	
        if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
            creep.memory.targetId = undefined;
        }
        if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.repairing = true;
        }

        if(creep.memory.repairing) {
        	let target;
        	let targetId = creep.memory.targetId;
        	if(targetId!=undefined && Game.getObjectById(targetId)!=undefined){
        		target = Game.getObjectById(targetId);
        		if(target.hits == target.hitsMax){
        			target = undefined;
        		}
        	}
        	
        	if(!target){
        		const targets = creep.room.find(FIND_STRUCTURES, {filter: (structure) => structure.hits < structure.hitsMax && (structure.structureType==STRUCTURE_WALL || structure.structureType==STRUCTURE_RAMPART)});
        		//排序得到最低血量的wall或rampart
        		let minHits = 300000000;
        		for(let i=0;i<targets.length;i++){
        			if(targets[i].hits<minHits){
        				minHits = targets[i].hits;
        				target = targets[i];
        			}
        		}
        		if(target){
        			creep.memory.targetId = target.id;
        		}
        	}
        	
        	if(target) {
                if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        else {
        	if(!creepUtil.harvestNearbyTombstone(creep)){
	        	if(!creepUtil.getEnergyFromStorage(creep)){
	        		if(!creepUtil.getEnergyFromClosestStructure(creep)){
		        		creepUtil.harvestClosestEnergy(creep);
		        	}
	        	}
        	}
        }
    }
};

module.exports = roleWallRepairer;