var creepUtil = require('creepUtil');

var roleUpgrader = {

    run: function(creep) {
    	if(creepUtil.evadeHostiles(creep)){
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
        	creepUtil.harvestClosestEnergy(creep);
        }
    }
};

module.exports = roleUpgrader;