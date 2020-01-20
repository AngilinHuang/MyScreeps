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
    //为塔和spawn充能的单位不要加该限制
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
	
    /**
     * 采集最近的资源，FIND_SOURCES_ACTIVE 比 FIND_SOURCES 多了条件 {filter: (source) => source.store[RESOURCE_ENERGY]>0}
     * 
     * harvest returnValue
	    ERR_NOT_OWNER	-1	You are not the owner of this creep, or the room controller is owned or reserved by another player.
		ERR_BUSY	-4	The creep is still being spawned.
		ERR_NOT_FOUND	-5	Extractor not found. You must build an extractor structure to harvest minerals. Learn more
		ERR_NOT_ENOUGH_RESOURCES	-6	The target does not contain any harvestable energy or mineral.
		ERR_INVALID_TARGET	-7	The target is not a valid source or mineral object.
		ERR_NOT_IN_RANGE	-9	The target is too far away.
		ERR_TIRED	-11	The extractor is still cooling down.
		ERR_NO_BODYPART	-12	There are no WORK body parts in this creep’s body.
     */
	harvestClosestEnergy: function(creep){
		const source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
		if(source){
			const returnValue = creep.harvest(source);
			if(returnValue == ERR_NOT_IN_RANGE) {
			    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffffff'}});
			}
			else if(returnValue!=OK && returnValue!=ERR_BUSY){
				console.log(creep.name+' harvest error. returnValue='+returnValue);
			}
		}
	},
	//从距离最近的link,storage,container中获取能量（适用于harverster以外的工人）
	getEnergyFromClosestStructure: function(creep){
		const target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_LINK && structure.store[RESOURCE_ENERGY] >150)
                	||(structure.structureType == STRUCTURE_STORAGE && structure.store[RESOURCE_ENERGY]>0)
                    ||(structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY]>0)
                    ;
	            }
	    });
		if(target){
			if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
			}
			return true;
		}
		return false;
	},
	//从storage获取能量，适用于wallRepairer等大容量creeps
	getEnergyFromStorage: function(creep){
		const target = creep.room.storage;
		if(target && target.store[RESOURCE_ENERGY]>0){
			if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
			}
			return true;
		}
		else{
			return false;
		}
	},
	/**
	 * 从房间中的远距离墓碑或掉落资源中获取能量和矿物
	 * 优先拾取矿物
	 * 
	 * withdraw returnValue
		ERR_NOT_OWNER	-1	You are not the owner of this creep, or there is a hostile rampart on top of the target.
		ERR_BUSY	-4	The creep is still being spawned.		
		ERR_NOT_ENOUGH_RESOURCES	-6	The target does not have the given amount of resources.	
		ERR_INVALID_TARGET	-7	The target is not a valid object which can contain the specified resource.
		ERR_FULL	-8	The creep's carry is full.
		ERR_NOT_IN_RANGE	-9	The target is too far away.
		ERR_INVALID_ARGS	-10	The resourceType is not one of the RESOURCE_* constants, or the amount is incorrect.
	 *
	 * pickup returnValue
		ERR_NOT_OWNER	-1	You are not the owner of this creep.
		ERR_BUSY	-4	The power creep is not spawned in the world.
		ERR_INVALID_TARGET	-7	The target is not a valid object to pick up.
		ERR_FULL	-8	The creep cannot receive any more resource.
		ERR_NOT_IN_RANGE	-9	The target is too far away.	
	 */
	harvestTombstone: function(creep){
	    //如果当前房间正在受到进攻，跳过该功能
	    const threatLevel = creep.room.memory.threatLevel;
	    if(threatLevel!=undefined && threatLevel>0){
	        return false;
	    }
		const tombstone = creep.pos.findClosestByRange(FIND_TOMBSTONES);
		if(tombstone &&  tombstone.store.getUsedCapacity()>0){
			if(tombstone.store.getUsedCapacity() == tombstone.store[RESOURCE_ENERGY]){
				const returnValue = creep.withdraw(tombstone, RESOURCE_ENERGY);
				if(returnValue == ERR_NOT_IN_RANGE) {
				    creep.moveTo(tombstone);
				    return true;
				}
				else if(returnValue == OK || returnValue == ERR_BUSY){
			    	return true;
			    }
			    else {
			    	console.log(creep.name + ' withdraw tombstone engergy error. returnValue='+returnValue);
			    	return false;
			    }
				return false;
			}
			else{
				for(let resourceType in tombstone.store) {
					if(resourceType == RESOURCE_ENERGY){
						continue;
					}
				    let returnValue = creep.withdraw(tombstone, resourceType);
					if(returnValue == ERR_NOT_IN_RANGE) {
		                creep.moveTo(tombstone, {visualizePathStyle: {stroke: '#ffffff'}});
		                return true;
		            }
		            else if(returnValue!=OK && returnValue != ERR_BUSY){
				        console.log(creep.name + ' withdraw tombstone resource error. returnValue='+returnValue);
				        return false;
				    }
				    else{
				        return true;
				    }
		    	}
			}
			return false;
		}
		else{
			//dropped resource要用pickup命令拾取
			const target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
			if(target) {
			    const returnValue = creep.pickup(target);
			    if(returnValue == ERR_NOT_IN_RANGE) {
			        creep.moveTo(target);
			        return true;
			    }
			    else if(returnValue!=OK && returnValue != ERR_BUSY){
			        console.log(creep.name + ' pickup error. returnValue='+returnValue);
			        return false;
			    }
			    else{
			        return true;
			    }
			}
			return false;
		}
	},
	//从3格内的有能量的墓碑获取能量（适用于所有使用能量的工人）
	harvestNearbyTombstone: function(creep){
	    //如果当前房间正在受到进攻，跳过该功能
	    const threatLevel = creep.room.memory.threatLevel;
	    if(threatLevel!=undefined && threatLevel>0){
	        return false;
	    }
		const tombstones = creep.pos.findInRange(FIND_TOMBSTONES, 3);
		if(tombstones.length>0 && tombstones[0].store[RESOURCE_ENERGY]>0){
			const returnValue = creep.withdraw(tombstones[0], RESOURCE_ENERGY);
			if(returnValue == ERR_NOT_IN_RANGE) {
			    creep.moveTo(tombstones[0]);
			    return true;
			}
			else if(returnValue == OK || returnValue == ERR_BUSY){
		    	return true;
		    }
		    else {
		    	console.log(creep.name + ' withdraw tombstone error. returnValue='+returnValue);
		    	return false;
		    }
		    return false;
		}
		else{
			//FIND_DROPPED_ENERGY即将被移除，需要用FIND_DROPPED_RESOURCES替代
			const droppedEnergy = creep.pos.findInRange(FIND_DROPPED_RESOURCES, 3);
			if(droppedEnergy.length>0 && droppedEnergy[0].energy>0) {
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
			    	return false;
			    }
			}
			return false;
		}
	},
	//从2格内的有矿物资源的墓碑获取矿物（适用于extracter）
	//掉落的矿物资源无法pickup，报-7错误
	harvestNearbyMineralTombstone: function(creep){
		const tombstones = creep.pos.findInRange(FIND_TOMBSTONES, 2);
		if(tombstones.length>0 && tombstones[0].store.getUsedCapacity()>0 && tombstones[0].store[RESOURCE_ENERGY]!=tombstones[0].store.getUsedCapacity()){
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
			const droppedResources = creep.pos.findInRange(FIND_DROPPED_RESOURCES, 2);
			if(droppedResources.length>0 && droppedResources[0].store[RESOURCE_ENERGY]==0) {
				const returnValue = creep.pickup(droppedResources[0]);
			    if(returnValue == ERR_NOT_IN_RANGE) {
			        creep.moveTo(droppedResources[0]);
			        return true;
			    }
			    else if(returnValue == OK || returnValue == ERR_BUSY){
			    	return true;
			    }
			    else {
			    	console.log(creep.name + ' pickup error. returnValue='+returnValue);
			    }
			}
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
    	//建造rampart后把血量抬到500
    	const targets = creep.pos.findInRange(FIND_STRUCTURES, 4, {filter: (structure) => structure.hits < 500 && structure.structureType==STRUCTURE_RAMPART});
    	if(targets && targets.length>0) {
            if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
            return true;
        }
    	else{
    		//从最近的建造点开始建造
        	const target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            if(target) {
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
                return true;
            }
            else{
            	return false;
            }
    	}
    },
    //为spawn和extension和tower和lab和powerBank供能，terminal保证10K能量储备
    transferEnergyToFunctionalStructure: function(creep){
    	const target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return ((structure.structureType == STRUCTURE_EXTENSION 
                		|| structure.structureType == STRUCTURE_SPAWN
                		|| structure.structureType == STRUCTURE_LAB
                		|| structure.structureType == STRUCTURE_NUKER
                		|| structure.structureType == STRUCTURE_POWER_SPAWN) &&
                		structure.store[RESOURCE_ENERGY] < structure.store.getCapacity(RESOURCE_ENERGY))
                    || (structure.structureType == STRUCTURE_TOWER &&
                    		structure.store[RESOURCE_ENERGY] < 800)
                    || (structure.structureType == STRUCTURE_TERMINAL &&
                    		structure.store[RESOURCE_ENERGY] < 30000)
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
    },
    
    //为spawn和extension和tower供能
    transferEnergyToSpawnAndTower: function(creep){
    	const target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return ((structure.structureType == STRUCTURE_EXTENSION 
                		|| structure.structureType == STRUCTURE_SPAWN) &&
                		structure.store[RESOURCE_ENERGY] < structure.store.getCapacity(RESOURCE_ENERGY))
                    || (structure.structureType == STRUCTURE_TOWER &&
                    		structure.store[RESOURCE_ENERGY] < 800)
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