var creepUtil = {
		
    concentrateToFlag: function(creep, flagColor) {
    	const flags = creep.room.find(FIND_FLAGS, {
            filter: (flag) => {return flag.color==flagColor;
            }
        });
        if(flags.length>0){
        	creep.moveTo(flags[0], {visualizePathStyle: {stroke: '#ffffff'}});
        }
    },
    
    //工作单位回避敌人
    evadeHostiles: function(creep){
    	const hostiles = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 10);
	    if(hostiles.length > 0) {
	    	const spawn = creep.pos.findClosestByRange(FIND_MY_SPAWNS);
	    	if(spawn){
		        creep.moveTo(spawn);
		        return true;
	    	}
	    }
	    return false;
    },
	    

	harvestClosestEnergy: function(creep){
		const source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE, {filter: (source) => source.energy>0 || source.ticksToRegeneration<30});
		if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
		    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffffff'}});
		}
	},
	
	harvestTombstone: function(creep){
		const tombstone = creep.pos.findClosestByRange(FIND_TOMBSTONES);
		if(tombstone && tombstone.store[RESOURCE_ENERGY]>0){
			if(creep.withdraw(tombstone, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
			    creep.moveTo(tombstone);
			}
			return true;
		}
		else{
			return false;
		}
	},
    
    tryToRepair: function(creep){
    	const target = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => structure.hits < structure.hitsMax});
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
    	const target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION 
                		|| structure.structureType == STRUCTURE_SPAWN
                		|| structure.structureType == STRUCTURE_STORAGE) &&
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