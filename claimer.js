var creepUtil = require('creepUtil');


/*
 * room claimer功能
 * 
 * Game.spawns['Spawn1'].spawnCreep( [CLAIM,MOVE],'Claim1'+Game.time,{ memory: { role: 'claimer', target: 'W15S19',oper:'claim' } } );
 * 
 */
var roleClaimer = {
    run: function(creep) {
    	if(creepUtil.evadeHostiles(creep)){
    		return;
    	}
    	const targetRoom = creep.memory.target;
    	if(targetRoom){
    		//注意，如果没有任何单位在另一个房间里，Game.rooms无法得到该房间
    		//需要先发射probe
    		if(creep.room!=Game.rooms[targetRoom]){
	    		const exitDir = creep.room.findExitTo(Game.rooms[targetRoom]);
	        	const exit = creep.pos.findClosestByRange(exitDir);
	        	creep.moveTo(exit);
    		}
    		else{
    			if(creep.room.controller) {
    				const oper = creep.memory.oper;
    				if(oper=="reserve"){
    					if(creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
    				        creep.moveTo(creep.room.controller);
    				    }
    				}
    				else if(oper=="attack"){
    					if(!creep.room.controller.my) {
						    if(creep.attackController(creep.room.controller) == ERR_NOT_IN_RANGE) {
						        creep.moveTo(creep.room.controller);
						    }
    					}
    				}
    				else{
	    			    if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
	    			        creep.moveTo(creep.room.controller);
	    			    }
    				}
    			}
    		}
    	}
    }
};

module.exports = roleClaimer;