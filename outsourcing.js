var creepUtil = require('creepUtil');


/*
 * outsourcing功能
 * 对新占领的房间进行远距离支持
 * 需要指定以下参数
 * memory.target=目标房间name
 * memory.targetRole=在目标房间担任的角色
 * memory.target=走到目标房间的指定位置后再变化为目标角色（可选参数）
 * 
 */
var roleOutsourcing = {
    run: function(creep) {
    	if(creepUtil.evadeHostiles(creep)){
    		return;
    	}
    	if(creep.carry.energy < creep.carryCapacity){
    		creepUtil.getEnergyFromStorage(creep);
    	}
    	else{
    		const targetRoom = creep.memory.target;
    		const targetObj = creep.memory.targetObj;
    		const targetRole = creep.memory.targetRole;
        	if(targetRoom){
        		if(creep.room!=Game.rooms[targetRoom]){
    	    		const exitDir = creep.room.findExitTo(Game.rooms[targetRoom]);
    	        	const exit = creep.pos.findClosestByRange(exitDir);
    	        	creep.moveTo(exit);
        		}
        		else{
        			if(targetObj){
        				const target = Game.getObjectById(targetObj);
        				if(creep.pos.findInRange([target],4).length>0){
        					creep.memory.role = creep.memory.targetRole;
                			creep.memory.target = undefined;
        				}
        				else{
        					creep.moveTo(target);
        				}
        			}
        			else{
        				creep.memory.role = creep.memory.targetRole;
            			creep.memory.target = undefined;
        			}
        		}
        	}
    	}
    }
};

module.exports = roleOutsourcing;