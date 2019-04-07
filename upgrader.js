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
        	if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        	else{
        		creepUtil.concentrateToFlag(creep, COLOR_WHITE);
            }
        }
        else {
        	creepUtil.harvestClosestEnergy(creep);
        }
    }
};

module.exports = roleUpgrader;