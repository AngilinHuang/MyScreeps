var creepUtil = require('creepUtil');


/*
 * outsourcing功能
 * 对新占领的房间进行远距离支持
 * 需要指定以下参数
 * memory.target=目标房间name
 * memory.targetRole=在目标房间担任的角色
 * memory.targetObj=走到目标房间的指定位置后再变化为目标角色（可选参数，但推荐使用，防止房间出口过大时走到了不适合的位置）
 * 
 * 
 * 可以作为probe使用
 * Game.spawns['Spawn2'].spawnCreep([MOVE],'Probe'+Game.time,{ memory: { role:'outsourcing' ,targetRole: 'builder', target: 'E28S26', room:'E28S26' ,passThroughRoom:'E30S27'} } )
 *    
 */
var roleOutsourcing = {
    run: function(creep) {
    	if(creepUtil.evadeHostiles(creep)){
    		return;
    	}
    	
		const targetRoom = creep.memory.target;
		const targetObj = creep.memory.targetObj;
		const targetRole = creep.memory.targetRole;
		
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
    	
		//targetObj的问题在于没房间视野就获取不到这个房间的对象
		if(targetObj){
			const target = Game.getObjectById(targetObj);
			if(target){
				if(creep.pos.findInRange([target],4).length>0){
					creep.memory.role = creep.memory.targetRole;
				}
				else{
					creep.moveTo(target);
					return;
				}
			}
			
		}
		if(targetRoom){
    		if(creep.room.name!=targetRoom){
    			//该方法在新手区时可能会撞墙，建议多用targetObj
	    		const exitDir = creep.room.findExitTo(targetRoom);
	        	const exit = creep.pos.findClosestByRange(exitDir);
	        	creep.moveTo(exit);
	        	return;
    		}
    		else{
    			const targetRole = creep.memory.targetRole;
    			//如果是harvester且目标房间有2个能量点，将把harvester分配到不同的能量点
    			if(targetRole=='harvester' || targetRole=='reserveHarvester'){
    				const resources = creep.room.find(FIND_SOURCES);
        			if(resources.length>1){
        				let sourceId;
        				for(let i=0;i<resources.length;i++){
    	    				let assignedResoureHarvester = _.filter(Game.creeps, (creep) => creep.memory.role == targetRole && creep.memory.room==targetRoom && creep.memory.sourceId == resources[i].id);
    	    				if(assignedResoureHarvester.length < 1){
    	    					sourceId = resources[i].id;
    	    					break;
    	    				}
    	    			}
        				if(sourceId){
        					creep.memory.sourceId = sourceId;
        				}
        			}
    			}
    			
    			creep.memory.role = targetRole;
    		}
		}
    }
};

module.exports = roleOutsourcing;