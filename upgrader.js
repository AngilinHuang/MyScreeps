var creepUtil = require('creepUtil');

/*
 * upgrader功能
 * 工作优先级
 * 1、升级当前房间的room controller
 * 采集优先级
 * 1、从3格内有能量的tombstone获取能量
 * 2、从最近的有能量的link,storage,container获取能量
 * 3、从当前房间内最近的有能量的source采集
 * 
 */
var roleUpgrader = {

    run: function(creep) {

    	if(!creepUtil.checkRoom(creep)){
    		return;
    	}
    	
        if(creep.memory.upgrader && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrader = false;
        }
        if(!creep.memory.upgrader && creep.store[RESOURCE_ENERGY] == creep.store.getCapacity()) {
            creep.memory.upgrader = true;
        }

        if(creep.memory.upgrader) {
        	creepUtil.tryToUpgrade(creep);
        }
        else {
        	if(!creepUtil.harvestNearbyTombstone(creep)){
	        	if(!creepUtil.getEnergyFromClosestStructure(creep)){
	        		creepUtil.harvestClosestEnergy(creep);
	        	}
        	}
        }
    }
};

module.exports = roleUpgrader;