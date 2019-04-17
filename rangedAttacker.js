var creepUtil = require('creepUtil');

/*
 * 
 * 
 * Game.spawns['Spawn1'].spawnCreep( [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE],'Ranged'+Game.time,{ memory: { role: 'rangedAttacker', target: 'W15S17'} } )
 */
var roleRangedAttacker = {
    run: function(creep) {
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
    		    //TODO 避免挡路，需要更好的写法
    			creep.move(TOP);
    		}
    	}
    }
};

module.exports = roleRangedAttacker;

