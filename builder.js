var creepUtil = require('creepUtil');

var roleBuilder = {

    run: function(creep) {
        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
        }

        if(creep.memory.building) {
        	if(!creepUtil.tryToBuild(creep)){
        		if(!creepUtil.tryToRepair(creep)){
	        		if(!creepUtil.tryToUpgrade(creep)){
	        			creepUtil.concentrateToFlag(creep, COLOR_WHITE);
	            	}
        		}
        	}
        }
        else {
        	creepUtil.harvestClosestEnergy(creep);
        }
    }
};

module.exports = roleBuilder;