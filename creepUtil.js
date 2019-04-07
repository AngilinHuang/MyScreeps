var creepUtil = {
		
    concentrateToFlag: function(creep, flagColor) {
        var flags = creep.room.find(FIND_FLAGS, {
            filter: (flag) => {return flag.color==flagColor;
            }
        });
        if(flags.length>0){
        	creep.moveTo(flags[0], {visualizePathStyle: {stroke: '#ffffff'}});
        }
    },

	harvestClosestEnergy: function(creep){
		var source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
		if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
		    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffffff'}});
		}
	},
    
    tryToRepair: function(creep){
    	var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => structure.hits < structure.hitsMax});
        if(target) {
            if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            return true;
        }
        else{
        	return false;
        }
    },
    
    tryToUpgrade: function(creep){ 
	    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
	        creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
	        return true;
	    }
	    else{
	    	return false;
	    }
    },
    
    tryToBuild: function(creep){
    	//从最近的建造点开始建造
        var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
        if(target) {
            if(creep.build(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            return true;
        }
        else{
        	return false;
        }
    },
    
    getEnergyFromClosestStructure: function(creep){
    	var targets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION 
                		|| structure.structureType == STRUCTURE_SPAWN
                		|| structure.structureType == STRUCTURE_STORAGE
                		|| structure.structureType == STRUCTURE_CONTAINER) &&
                    structure.energy > 0;
            }
    	});
    	if(target){
    		if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
    		return true;
    	}
    	else{
    		return false;
    	}
    }


};

module.exports = creepUtil;