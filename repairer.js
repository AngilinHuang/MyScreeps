var creepUtil = require('creepUtil');

var roleRepairer = {

    run: function(creep) {
    	if(creepUtil.evadeHostiles(creep)){
    		return;
    	}
    	
        if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
        }
        if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.repairing = true;
        }
        
        //100K  cost 1K energy
        let wallHitsLimit = 100000;
        //rampartMaxHit:level4=3000000;level5=10000000;level6=30000000;level7=100000000;level8=300000000;
        

        if(creep.memory.repairing) {
            let target = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => structure.hits < structure.hitsMax && structure.structureType!=STRUCTURE_WALL});
            if(target) {
                if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else{
            	target = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => structure.hits < wallHitsLimit && structure.structureType==STRUCTURE_WALL});
            	if(target) {
                    if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            	else{
            		creepUtil.tryToUpgrade(creep);
            	}
            }
        }
        else {
        	creepUtil.harvestClosestEnergy(creep);
        }
    }
};

module.exports = roleRepairer;