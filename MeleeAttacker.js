var creepUtil = require('creepUtil');

/*
 * MeleeAttacker
 * 
 * 行动优先级
 * 1、攻击房间内最近的敌人
 * 2、如果没有敌人且设置了passThroughRoom，会先进入passThroughRoom
 * 3、朝着targetRoom前进
 * 4、朝着红色flag移动
 * 
 * Game.spawns['Spawn1'].spawnCreep( [TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE],'Melee'+Game.time,{ memory: { role: 'meleeAttacker', target: 'W14S18'} });
 * 
 */
var roleMeleeAttacker = {
    run: function(creep) {
    	const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    	if(target) {
    	    if(creep.attack(target) == ERR_NOT_IN_RANGE) {
    	        creep.moveTo(target);
    	    }
    	    return;
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

module.exports = roleMeleeAttacker;

