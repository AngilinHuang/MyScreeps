var creepUtil = require('creepUtil');

/*
 * upgrader功能
 * 工作优先级
 * 1、升级当前房间的room controller
 * 采集优先级
 * 1、从当前房间内最近的有能量的source采集
 * 
 */
var roleUpgrader = {

    run: function(creep) {
    	if(creepUtil.evadeHostiles(creep)){
    		return;
    	}
    	if(!creepUtil.checkRoom(creep)){
    		return;
    	}
    	
        if(creep.memory.upgrader && creep.carry.energy == 0) {
            creep.memory.upgrader = false;
        }
        if(!creep.memory.upgrader && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrader = true;
        }

        if(creep.memory.upgrader) {
        	creepUtil.tryToUpgrade(creep);
        }
        else {
        	if(!creepUtil.getEnergyFromClosestStructure(creep)){
        		creepUtil.harvestClosestEnergy(creep);
        	}
        }
    }
};

module.exports = roleUpgrader;