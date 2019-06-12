var creepUtil = require('creepUtil');

/*
 * extracter功能
 * 工作优先级
 * 1、如果2格内有container，将矿物放入该建筑
 * 2、将矿物放入terminal，直到该矿物有100K
 * 3、将矿物放入storage
 * 采集优先级
 * 1、从2格内有矿物资源的tombstone获取矿物
 * 2、从当前房间内mineral采集
 * 
 * 
 * 注意：extractor有 5tick harvest CD，每个work部件采集1（不是2），50000tick储量恢复CD，用mineralType属性查看矿物是什么
 * 储量DENSITY_LOW: 15,000 
 * DENSITY_MODERATE: 35,000
 * DENSITY_HIGH: 70,000 
 * DENSITY_ULTRA: 100,000
 * 注意50000tick储量恢复CD，是在采光这个mineral矿点后才触发的，所以work部件多还是有必要的
 * 从市场交易价格来看，采集矿物资源不如采集能量，只能算是能量采完后的补充手段
 * 
 */
var roleExtracter = {
    run: function(creep) {

    	if(!creepUtil.checkRoom(creep)){
    		return;
    	}
    	
    	if(creep.memory.opt && _.sum(creep.carry) == 0) {
            creep.memory.opt = false;
        }
        if(!creep.memory.opt && _.sum(creep.carry) == creep.carryCapacity) {
            creep.memory.opt = true;
        }
    	
        if(!creep.memory.opt) {
        	if(!creepUtil.harvestNearbyMineralTombstone(creep)){
        		const mineral = creep.pos.findClosestByRange(FIND_MINERALS);
            	if(mineral){
            		const returnValue = creep.harvest(mineral);
        			if(returnValue == ERR_NOT_IN_RANGE) {
        			    creep.moveTo(mineral, {visualizePathStyle: {stroke: '#ffffff'}});
        			    return;
        			}
        			else if(returnValue!=OK && returnValue!=ERR_NOT_ENOUGH_RESOURCES && returnValue!=ERR_TIRED && returnValue!=ERR_BUSY){
        				console.log('extracter '+creep.name+' harvest extractor error. error code='+returnValue);
        			}
        		}
        		else{
        			console.log('There is no mineral in room '+creep.room.name);
        		}
        	}
        }
        else {
        	let target;
        	let targets = creep.pos.findInRange(FIND_STRUCTURES, 1, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER &&
                        	_.sum(structure.store)<structure.storeCapacity);
                }
        	});
        	if(targets && targets.length>0){
        		target = targets[0];
        	}
        	else if(creep.room.terminal && _.sum(creep.room.terminal.store)<creep.room.terminal.storeCapacity){
        	    const mineral = creep.room.controller.pos.findClosestByRange(FIND_MINERALS);
				if(mineral && (creep.room.terminal.store[mineral.mineralType]==undefined || creep.room.terminal.store[mineral.mineralType]<100000)){
					target = creep.room.terminal;
				}
				else{
				    target = creep.room.storage;
				}
        	}
        	else{
        		target = creep.room.storage;
        	}
            if(target) {
            	for(let resourceType in creep.carry) {
            		if(creep.transfer(target, resourceType) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                        return;
                    }
            	}
                
            }
        }
    }
};

module.exports = roleExtracter;