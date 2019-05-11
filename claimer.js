var creepUtil = require('creepUtil');


/*
 * room claimer功能
 * 
 * 
 * claim功能
 * 如果该controller已被其他玩家占有，则会使用attackController直到能够claim
 * Game.spawns['Spawn1'].spawnCreep( [CLAIM,MOVE],'Claimer'+Game.time,{ memory: { role: 'claimer', target: 'W14S18',oper:'claim' } } );
 * 
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
    	const targetObj = creep.memory.targetObj;
    	//targetObj的问题在于没房间视野就获取不到这个房间的对象
		if(targetObj){
			const target = Game.getObjectById(targetObj);
			if(target){
				if(creep.pos.findInRange([target],4).length==0){
					creep.moveTo(target);
					return;
				}
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
    					const returnValue = creep.claimController(creep.room.controller);
	    			    if(returnValue == ERR_NOT_IN_RANGE) {
	    			        creep.moveTo(creep.room.controller);
	    			    }
	    			    else if(returnValue == ERR_INVALID_TARGET){
	    			    	if(!creep.room.controller.my) {
							    if(creep.attackController(creep.room.controller) == ERR_NOT_IN_RANGE) {
							        creep.moveTo(creep.room.controller);
							    }
	    					}
	    			    }
    				}
    			}
    		}
    	}
    }
};

module.exports = roleClaimer;