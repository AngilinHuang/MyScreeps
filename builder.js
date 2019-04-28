var creepUtil = require('creepUtil');

/*
 * builder功能
 * 工作优先级
 * 1、用能量填满房间内最近的spawn，extension，tower(能量小于800)
 * 2、建造房间内最近的construction site
 * 3、升级当前房间的room controller
 * 采集优先级
 * 1、从3格内有能量的tombstone获取能量
 * 2、从最近的link，container，storage获得能量
 * 3、从当前房间内最近的有能量的source采集
 * 
 */
var roleBuilder = {

    run: function(creep) {
    	if(creepUtil.evadeHostiles(creep)){
    		return;
    	}
    	if(!creepUtil.checkRoom(creep)){
    		return;
    	}
    	
        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
        }

        if(creep.memory.building) {
        	if(!creepUtil.transferEnergyToFunctionalStructure(creep)){
        		if(!creepUtil.tryToBuild(creep)){
            		creepUtil.tryToUpgrade(creep);
            	}
        	}
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

module.exports = roleBuilder;