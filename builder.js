var creepUtil = require('creepUtil');

/*
 * builder功能
 * 工作优先级
 * 1、用能量填满房间内最近的spawn，extension，tower(能量小于800)，link(storage旁且能量小于450)
 * 2、建造房间内最近的construction site
 * 3、升级当前房间的room controller
 * 采集优先级
 * 1、如果storage旁边的link有能量储备且储备大于600且地图中有采集类link时，从link(storage）采集能量
 * 2、如果storage存在且有能量储备，从storage采集
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
        	//builder很忙时注释掉
        	if(!creepUtil.harvestTombstone(creep)){
	        	if(!creepUtil.getEnergyFromStorage(creep)){
	        		creepUtil.harvestClosestEnergy(creep);
	        	}
        	}
        }
    }
};

module.exports = roleBuilder;