var creepUtil = require('creepUtil');

var roleHarvester = {
    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity) {
            creepUtil.harvestClosestEnergy(creep);
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION 
                        		|| structure.structureType == STRUCTURE_SPAWN
                        		|| structure.structureType == STRUCTURE_TOWER
                        		|| structure.structureType == STRUCTURE_STORAGE
                        		|| structure.structureType == STRUCTURE_CONTAINER) &&
                            structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else{
            	if(!creepUtil.tryToUpgrade(creep)){
        			creepUtil.concentrateToFlag(creep, COLOR_WHITE);
            	}
            }
        }
    }
};

module.exports = roleHarvester;