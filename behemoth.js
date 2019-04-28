
var creepUtil = require('creepUtil');


/*
 * behemoth功能
 * 
 * 肉盾
 * 
 * 
 */
var roleBehemoth = {
    run: function(creep) {
    	
    	if(creep.getActiveBodyparts(RANGED_ATTACK)>0){
    		let targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
        	if(targets.length > 0) {
        		creep.rangedAttack(targets[0]);
        	}
        	else{
        		targets = creep.pos.findInRange(FIND_HOSTILE_STRUCTURES, 3,
            		    {filter: {structureType: STRUCTURE_TOWER}});
        		if(targets.length > 0) {
            		creep.rangedAttack(targets[0]);
            	}
        	}
    	}
    	if(creep.getActiveBodyparts(ATTACK)>0){
    		let target = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES,
        		    {filter: {structureType: STRUCTURE_TOWER}});
    		if(target && target.pos.isNearTo(creep)){
    			creep.attack(target);
    		}
    		else{
    			target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    			if(target && target.pos.isNearTo(creep)){
    				creep.attack(target);
    			}
    			else{
    				target = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);
        			if(target && target.pos.isNearTo(creep)){
        				creep.attack(target);
        			}
    			}
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
	        	return;
    		}
    	}
    	
    	creepUtil.concentrateToFlag(creep,COLOR_BLUE);
    }
};

module.exports = roleBehemoth;

