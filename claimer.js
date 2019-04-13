var creepUtil = require('creepUtil');


/*
 * room claimer功能
 * 
 * 
 * claim功能
 * Game.spawns['Spawn1'].spawnCreep( [CLAIM,MOVE],'Claimer'+Game.time,{ memory: { role: 'claimer', target: 'W15S19',oper:'claim' } } );
 * 
 * reserve功能
 * reserve后能量点变为3000能量，且可以建造道路和container
 * Game.spawns['Spawn1'].spawnCreep( [CLAIM,MOVE,CLAIM,MOVE],'Claimer'+Game.time,{ memory: { role: 'claimer', target: 'W15S17',oper:'reserve' } } )
 * 
 */
var roleClaimer = {
    run: function(creep) {
    	if(creepUtil.evadeHostiles(creep)){
    		return;
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