var creepUtil = {
	
	//creep检查自己是否在指定的房间中，如果不是，寻找出口走向指定的房间
	checkRoom: function(creep) {
		const room = creep.memory.room;
    	if(room){
    		if(creep.room!=Game.rooms[room]){
	    		const exitDir = creep.room.findExitTo(Game.rooms[room]);
	        	const exit = creep.pos.findClosestByRange(exitDir);
	        	creep.moveTo(exit);
	    		return false;
    		}
    	}
    	return true;
    },
    
    //向指定颜色的旗子集中
    concentrateToFlag: function(creep, flagColor) {
    	const flags = creep.room.find(FIND_FLAGS, {
            filter: (flag) => {return flag.color==flagColor;
            }
        });
        if(flags.length>0){
        	creep.moveTo(flags[0], {visualizePathStyle: {stroke: '#ffffff'}});
        	return true;
        }
        else{
        	return false;
        }
    },
    
    //工作单位回避敌人
    evadeHostiles: function(creep){
    	//当前房间遭到入侵后再进行计算
    	if(creep.room.memory.threatLevel!=undefined && creep.room.memory.threatLevel>0){
	    	const hostiles = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 6);
		    if(hostiles.length > 0) {
		    	const spawn = creep.pos.findClosestByRange(FIND_MY_SPAWNS);
		    	if(spawn){
			        creep.moveTo(spawn);
			        return true;
		    	}
		    }
    	}
	    return false;
    },
	    
    //采集最近的资源，FIND_SOURCES_ACTIVE 比 FIND_SOURCES 多了条件 {filter: (source) => source.energy>0}
	harvestClosestEnergy: function(creep){
		const source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
		if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
		    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffffff'}});
		}
	},
	getEnergyFromStorage: function(creep){
		const target = creep.pos.findInRange(FIND_STRUCTURES,4,{
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_STORAGE && structure.store[RESOURCE_ENERGY]>0)
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
		}
		return false;
	},
	//从4格内有能量的link,storage,container中获取能量（适用于harverster以外的工人）
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
	//从房间中的有能量的墓碑获取能量
	harvestTombstone: function(creep){
		const tombstone = creep.pos.findClosestByRange(FIND_TOMBSTONES);
		if(tombstone && tombstone.store[RESOURCE_ENERGY]>0){
			if(creep.withdraw(tombstone, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
			    creep.moveTo(tombstone);
			}
			return true;
		}
		else{
			//dropped resource要用pickup命令拾取
			//const target = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
			/*if(target) {
			    if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
			        creep.moveTo(target);
			    }
			}*/
			
			/*const dropedSource = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
			//Game.getObjectById('5caeb0b40a0b387d36a6f7fc').pos.findClosestByRange(FIND_DROPPED_RESOURCES);
			//Game.getObjectById('5caeb0b40a0b387d36a6f7fc').withdraw(Game.getObjectById('5caeb0b40a0b387d36a6f7fc').pos.findClosestByRange(FIND_DROPPED_RESOURCES), RESOURCE_ENERGY)
			报错-7，不能这么用，那看来drop资源只能用container捡了
			if(dropedSource && dropedSource.energy>0){
				if(creep.withdraw(dropedSource, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				    creep.moveTo(dropedSource);
				}
				return true;
			}
			else{*/
				return false;
			//}
		}
	},
	//从2格内的有能量的墓碑获取能量（适用于所有使用能量的工人）
	harvestNearbyTombstone: function(creep){
		const tombstones = creep.pos.findInRange(FIND_TOMBSTONES, 2);
		if(tombstones.length>0 && tombstones[0].store[RESOURCE_ENERGY]>0){
			if(creep.withdraw(tombstones[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
			    creep.moveTo(tombstones[0]);
			}
			return true;
		}
		else{
			//FIND_DROPPED_ENERGY即将被移除，需要用FIND_DROPPED_RESOURCES替代
			/*const droppedEnergy = creep.pos.findInRange(FIND_DROPPED_ENERGY, 2);
			if(droppedEnergy.length>0) {
				const returnValue = creep.pickup(droppedEnergy[0]);
			    if(returnValue == ERR_NOT_IN_RANGE) {
			        creep.moveTo(droppedEnergy[0]);
			        return true;
			    }
			    else if(returnValue == OK || returnValue == ERR_BUSY){
			    	return true;
			    }
			    else {
			    	console.log(creep.name + ' pickup error. returnValue='+returnValue);
			    }
			}*/
			return false;
		}
	},
	//从2格内的有矿物资源的墓碑获取矿物（适用于extracter）
	//掉落的矿物资源无法pickup，报-7错误
	harvestNearbyMineralTombstone: function(creep){
		const tombstones = creep.pos.findInRange(FIND_TOMBSTONES, 2);
		if(tombstones.length>0 && _.sum(tombstones[0].store)>0 && tombstones[0].store[RESOURCE_ENERGY]!=_.sum(tombstones[0].store)){
			for(let resourceType in tombstones[0].store) {
				if(resourceType!=RESOURCE_ENERGY){
					if(creep.withdraw(tombstones[0], resourceType) == ERR_NOT_IN_RANGE) {
		                creep.moveTo(tombstones[0], {visualizePathStyle: {stroke: '#ffffff'}});
		                return;
		            }
				}
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
    //为spawn和extension和tower供能
    //如果仓库旁的link能量过低，为其供能
    transferEnergyToFunctionalStructure: function(creep){
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
	    	if(creep.room.memory.linkStorage){
				const linkStorage = Game.getObjectById(creep.room.memory.linkStorage);
				if(linkStorage && linkStorage.energy<450){
					if(creep.transfer(linkStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
			            creep.moveTo(linkStorage, {visualizePathStyle: {stroke: '#ffffff'}});
			        }
			        return true;
				}
			}
	    	return false;
	    }
    },
    
    //为spawn和extension和tower供能
    transferEnergyToSpawnAndTower: function(creep){
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