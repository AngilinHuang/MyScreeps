var creepUtil = require('creepUtil');

var roleUpgrader = {

    run: function(creep) {
        if(creep.memory.upgrader && creep.carry.energy == 0) {
            creep.memory.upgrader = false;
        }
        if(!creep.memory.upgrader && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrader = true;
        }

        if(creep.memory.upgrader) {
        	if(!creepUtil.tryToUpgrade(creep)){
        		creepUtil.concentrateToFlag(creep, COLOR_WHITE);
            }
        }
        else {
        	creepUtil.harvestClosestEnergy(creep);
        }
    }
};

module.exports = roleUpgrader;