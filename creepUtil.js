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
		const source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE, {filter: (source) => source.energy>0});
		if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
		    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffffff'}});
		}
	},
	harvestClosestStorageOrEnergy: function(creep){
		if(creep.room.storage && creep.room.storage.store[RESOURCE_ENERGY]>0){
			if(creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				creep.moveTo(creep.room.storage, {visualizePathStyle: {stroke: '#ffffff'}});
			}
		}
		else{
			const source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE, {filter: (source) => source.energy>0});
			if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
			    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffffff'}});
			}
		}
	},
	getEnergyFromStorage: function(creep){
		if(creep.room.memory.linkStorage && (creep.room.memory.linkFroms!=undefined && creep.room.memory.linkFroms.length>0)){
			const linkStorage = Game.getObjectById(creep.room.memory.linkStorage);
			if(linkStorage && linkStorage.energy>600){
				if(creep.withdraw(linkStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(linkStorage, {visualizePathStyle: {stroke: '#ffffff'}});
				}
				return true;
			}
		}
		else if(creep.room.storage && creep.room.storage.store[RESOURCE_ENERGY]>0){
			if(creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				creep.moveTo(creep.room.storage, {visualizePathStyle: {stroke: '#ffffff'}});
			}
			return true;
		}
		return false;
	},
	getEnergyFromClosestStructure: function(creep){
		const target = creep.pos.findInRange(FIND_STRUCTURES,4,{
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_LINK && structure.energy >0)
                     ||(structure.structureType == STRUCTURE_STORAGE && structure.store[RESOURCE_ENERGY]>0)
                     ||(structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY]>0)
                    ;
	            }
	    });
		if(target && target.length>0){
			if(creep.withdraw(target[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				creep.moveTo(target[0], {visualizePathStyle: {stroke: '#ffffff'}});
			}
			return true;
		}
		else{
			return false;
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
    
    transferEnergyToFunctionalStructure: function(creep){
    	if(creep.room.memory.linkStorage){
			const linkStorage = Game.getObjectById(creep.room.memory.linkStorage);
			if(linkStorage && linkStorage.energy<600){
				if(creep.transfer(linkStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
		            creep.moveTo(linkStorage, {visualizePathStyle: {stroke: '#ffffff'}});
		        }
		        return true;
			}
		}
    	const target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return ((structure.structureType == STRUCTURE_EXTENSION 
                		|| structure.structureType == STRUCTURE_SPAWN) &&
                		structure.energy < structure.energyCapacity)
                    || (structure.structureType == STRUCTURE_TOWER &&
                    		structure.energy < 800)
                    ;
	            }
	    });
	    if(target) {
	        if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
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