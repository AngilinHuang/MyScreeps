var creepUtil = require('creepUtil');

/*
 * builder功能
 * 工作优先级
 * 1、用能量填满房间内最近的spawn，extension，tower
 * 2、建造房间内最近的construction site
 * 3、升级当前房间的room controller
 * 采集优先级
 * 1、如果房间内有tombstone存在且有能量，从tombstone采集能量
 * 2、如果storage存在且有能量储备，从storage采集
 * 3、从当前房间内最近的有能量的source采集
 * 
 */
var roleBuilder = {

    run: function(creep) {
    	if(creepUtil.evadeHostiles(creep)){
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
        	if(!creepUtil.harvestTombstone(creep)){
        		creepUtil.harvestClosestStorageOrEnergy(creep);
        	}
        }
    }
};

module.exports = roleBuilder;