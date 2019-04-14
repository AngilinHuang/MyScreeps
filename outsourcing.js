var creepUtil = require('creepUtil');


/*
 * outsourcing功能
 * 对新占领的房间进行远距离支持
 * 需要指定以下参数
 * memory.target=目标房间name
 * memory.targetRole=在目标房间担任的角色
 * memory.targetObj=走到目标房间的指定位置后再变化为目标角色（可选参数，但推荐使用）
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
    		if(targetObj){
				const target = Game.getObjectById(targetObj);
				if(creep.pos.findInRange([target],4).length>0){
					creep.memory.role = creep.memory.targetRole;
				}
				else{
					creep.moveTo(target);
				}
			}
			else if(targetRoom){
        		if(creep.room.name!=targetRoom){
        			//该方法在新手区时可能会撞墙，建议多用targetObj
    	    		const exitDir = creep.room.findExitTo(targetRoom);
    	        	const exit = creep.pos.findClosestByRange(exitDir);
    	        	creep.moveTo(exit);
        		}
        		else{
        			creep.memory.role = creep.memory.targetRole;
        		}
			}
    		
    	}
    }
};

module.exports = roleOutsourcing;