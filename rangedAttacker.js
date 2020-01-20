var creepUtil = require('creepUtil');

/*
 * RangedAttacker
 * 
 * 行动优先级
 * 1、攻击房间内最近的敌人
 * 2、如果没有敌人且设置了passThroughRoom，会先进入passThroughRoom
 * 3、朝着targetRoom前进
 * 4、朝着红色flag移动
 * 
 * Game.spawns['Spawn1'].spawnCreep( [TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,MOVE,RANGED_ATTACK,MOVE,RANGED_ATTACK,MOVE,RANGED_ATTACK,MOVE,RANGED_ATTACK,MOVE],'Ranged'+Game.time,{ memory: { role: 'rangedAttacker', target: 'W14S18'} });
 * 
 * Game.spawns['Spawn1'].spawnCreep( [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE],'Ranged'+Game.time,{ memory: { role: 'rangedAttacker', target: 'E27S27'} });
 * 
 * Game.spawns['Spawn1'].spawnCreep( [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE],'Ranged'+Game.time,{ memory: { role: 'rangedAttacker', target: 'E26S28', passThroughRoom:'E27S28'} });
 * 
 * 
 * Game.getObjectById('5d0378f0b43d0171dddc7ddc').memory.target='E27S26'
 * 
 * Game.getObjectById('5d0378f0b43d0171dddc7ddc').move(TOP)
 */
var roleRangedAttacker = {
    run: function(creep) {
    	if(creepUtil.concentrateToFlag(creep,COLOR_WHITE)){
    		return;
    	}
    	
    	if(creep.getActiveBodyparts(HEAL)>0){
    		if(creep.hits < creep.hitsMax){
        		let returnValue = creep.heal(creep);
        		if(returnValue!=OK){
        			console.log(creep.name+' can not heal itself');
        		}
        	}
        	else{
        		let targets = creep.pos.findInRange(FIND_MY_CREEPS, 3, {
            	    filter: function(object) {
            	        return object.hits < object.hitsMax;
            	    }
            	});
            	if(targets.length>0) {
            		if(creep.pos.isNearTo(targets[0])) {
        				let returnValue = creep.heal(targets[0]);
        				if(returnValue!=OK){
                			console.log(creep.name+' can not heal '+targets[0].name);
                		}
            	    }
            	    /*else {
            	    	//远程治疗范围为3
            	    	let returnValue = creep.rangedHeal(targets[0]);
            	    	if(returnValue!=OK){
                			console.log(creep.name+' can not heal '+targets[0].name);
                		}
            	    }*/
            	}
        	}
    	}
    	
    	const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    	const targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
    	if(targets.length > 0) {
    		if(creep.rangedAttack(targets[0]) == ERR_NOT_IN_RANGE) {
    	        creep.moveTo(target);
    	    }
    	    return;
    	}
    	else{
    		if(target){
    			creep.moveTo(target);
    		}
    	}
    	
    	const passThroughRoom = creep.memory.passThroughRoom;
    	if(passThroughRoom){
    		if(creep.room.name!=passThroughRoom){
	    		const exitDir = creep.room.findExitTo(passThroughRoom);
	        	const exit = creep.pos.findClosestByRange(exitDir);
	        	creep.moveTo(exit);
	    		return;
    		}
    		else{
    			creep.memory.passThroughRoom = undefined;
    		}
    	}
    	
    	const targetRoom = creep.memory.target;
    	if(targetRoom){
    		//注意，如果没有任何单位在另一个房间里，Game.rooms无法得到该房间，直接用findExitTo(targetRoomName)
    		if(creep.room.name!=targetRoom){
	    		const exitDir = creep.room.findExitTo(targetRoom);
	        	const exit = creep.pos.findClosestByRange(exitDir);
	        	creep.moveTo(exit);
    		}
    		else{
    			creepUtil.concentrateToFlag(creep,COLOR_RED);
    		}
    	}
    	
    }
};

module.exports = roleRangedAttacker;

