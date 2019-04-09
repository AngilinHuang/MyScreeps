var creepUtil = require('creepUtil');

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