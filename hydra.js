var creepUtil = require('creepUtil');

/*
 * 
 * hydra功能
 * 治疗
 * 
 * 行动优先级
 * 如果有passThroughRoom，会先进入passThroughRoom
 * 朝着targetRoom前进
 * 向绿色flag前进
 * 
 * 治疗优先级
 * 自己
 * 3格内其他单位
 * 
 * Game.spawns['Spawn1'].spawnCreep( [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,MOVE,HEAL,MOVE,HEAL,MOVE,HEAL,MOVE,HEAL,MOVE,HEAL,MOVE,HEAL,MOVE,HEAL,MOVE,HEAL,MOVE,HEAL,MOVE,HEAL,MOVE,HEAL,MOVE,HEAL,MOVE],'Hydra'+Game.time,{ memory: { role: 'hydra', target: 'W14S18'} } )
 * 13个heal  13*250=3250
 * 5个tough  50
 * 5+13个move  (5+13)*50=900
 * 
 * 
 * 有些操作是互相冲突的，每tick只能执行最右边的操作，分为3个冲突操作集
1、harvest  attack  build  repair dismantle  attackController rangedHeal  heal
2、rangedAttack rangedMassAttack  build  repair  rangedHeal
3、upgradeControler  build/repair  withdraw  transfer  drop
不在其中的不冲突，比如moveTo，pickup
而如果同时进行多个moveTo操作，最后一个会执行
注意：治疗或修理满血单位会返回OK，并阻止左侧命令的执行（也就是必须要判断是否满血）
 *
 * 更详细的信息见 https://docs.screeps.com/simultaneous-actions.html
 * 
 */
var roleHydra = {
    run: function(creep) {
    	//heal和move命令不冲突，先治疗再考虑移动，heal射程为1，治疗量为12
    	if(creep.hits < creep.hitsMax){
    		let returnValue = creep.heal(creep);
    		if(returnValue!=OK){
    			console.log(creep.name+' can not heal itself');
    		}
    	}
    	else{
    		let targets = creep.pos.findInRange(FIND_MY_CREEPS, 3, {
        	    filter: function(object) {
        	        return object.hits < object.hitsMax;
        	    }
        	});
        	if(targets.length>0) {
        		if(creep.pos.isNearTo(targets[0])) {
    				let returnValue = creep.heal(targets[0]);
    				if(returnValue!=OK){
            			console.log(creep.name+' can not heal '+targets[0].name);
            		}
        	    }
        	    else {
        	    	//远程治疗范围为3
        	    	let returnValue = creep.rangedHeal(targets[0]);
        	    	if(returnValue!=OK){
            			console.log(creep.name+' can not heal '+targets[0].name);
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
    	
    	creepUtil.concentrateToFlag(creep,COLOR_GREEN);
    }
};

module.exports = roleHydra;

