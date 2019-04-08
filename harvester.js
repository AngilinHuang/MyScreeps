var creepUtil = require('creepUtil');

var roleHarvester = {
    run: function(creep) {
    	if(creepUtil.evadeHostiles(creep)){
    		return;
    	}
    	
    	if(creep.memory.opt && creep.carry.energy == 0) {
            creep.memory.opt = false;
        }
        if(!creep.memory.opt && creep.carry.energy == creep.carryCapacity) {
            creep.memory.opt = true;
        }
    	
        if(!creep.memory.opt) {
            creepUtil.harvestClosestEnergy(creep);
        }
        else {
            let target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION 
                        		|| structure.structureType == STRUCTURE_SPAWN
                        		|| structure.structureType == STRUCTURE_TOWER) &&
                            structure.energy < structure.energyCapacity;
                    }
            });
            if(target==undefined){
            	target = creep.room.storage;
            }
            if(target) {
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else{
            	creepUtil.tryToUpgrade(creep);
            }
        }
    }
};

module.exports = roleHarvester;