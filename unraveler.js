var creepUtil = require('creepUtil');

/*
 * unraveler功能
 * 拆迁
 * dismantle射程为1，每个work部件50伤害
 * 
 * Game.spawns['Spawn1'].spawnCreep( [TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE],'Unraveler'+Game.time,{ memory: { role: 'unraveler', target: 'W14S18'} } )
 * 6work=600
 * 4tough=40 
 * 10move=500
 * 
 * 行动优先级
 * 如果有passThroughRoom，会先进入passThroughRoom
 * 朝着targetRoom前进
 *
 * 进入targetRoom后的攻击优先级
 * 指定的targetObj，一般是墙或rampart
 * 房间内最近的敌方tower
 * 房间内最近的敌方spawn
 * 房间内最近的敌方的墙和路以外的建筑
 * 
 */
var roleUnraveler = {
    run: function(creep) {
    	
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
	        	return;
    		}
    	}
    	
    	//TODO  问题：如果该建筑在rampart里会发生什么
		const targetObj = creep.memory.targetObj;
    	if(targetObj){
    		let target = Game.getObjectById(targetObj);
    		if(target){
    			if(creep.dismantle(target) == ERR_NOT_IN_RANGE) {
    		        creep.moveTo(target);
    		    }
    			return;
    		}
    	}
    	
    	
    	let target = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES,
    		    {filter: {structureType: STRUCTURE_TOWER}});
		if(target) {
		    if(creep.dismantle(target) == ERR_NOT_IN_RANGE) {
		        creep.moveTo(target);
		    }
		    return;
		}
    	
    	target = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES,
    		    {filter: {structureType: STRUCTURE_SPAWN}});
		if(target) {
		    if(creep.dismantle(target) == ERR_NOT_IN_RANGE) {
		        creep.moveTo(target);
		    }
		    return;
		}
		
		target = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES,{
            filter: (structure) => {
                return structure.structureType != STRUCTURE_WAL && structure.structureType != STRUCTURE_ROAD;
	        }
	    });
		if(target) {
		    if(creep.dismantle(target) == ERR_NOT_IN_RANGE) {
		        creep.moveTo(target);
		    }
		    return;
		}
    }
};

module.exports = roleUnraveler;

