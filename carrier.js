var creepUtil = require('creepUtil');


/*
 * carrier功能
 * 可以跨房间运输
 * Game.spawns['Spawn1'].spawnCreep( [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'Carry'+Game.time,{ memory: { role: 'carrier'
   , transportList: [{id:'',oper:0},{id:'',oper:1}]} } );
   oper=0取货，oper=1存货
 */
var roleCarrier = {
    run: function(creep) {
    	if(creepUtil.evadeHostiles(creep)){
    		return;
    	}
    	let transportList = creep.memory.transportList;
    	let transportArray = transportList.split(';');
    	
    	//房间，建筑id，装货还是卸货，资源类型（能量可以不填）
    	let target = transportArray.shift();
    	
    	if(!target){
    		console.log('carrier '+creep.name+' transportList does not work. transportList='+transportList);
    		return;
    	}
    	
    	const targetId = target.split(',')[0];
    	const oper = target.split(',')[1];
    	let resourceType = target.split(',')[2];
    	
    	if(targetId){
    		const targetObj = Game.getObjectById(targetId);
    		if(targetObj){
        		if(oper==0){
        		    //console.log(creep.name+' target='+targetObj.id);
        			//如果当前creep容量满，跳过所有取货动作
        			if(_.sum(creep.carry)==creep.carryCapacity){
        				transportArray.push(target);
        		    	creep.memory.transportList= transportArray.join(";");
        		    	return;
        			}
        			//console.log(creep.name+' target='+targetObj.id);
        			if(!creepUtil.harvestNearbyTombstone(creep)){
        				let returnValue = creep.withdraw(targetObj, resourceType);
            			if(returnValue == ERR_NOT_IN_RANGE) {
            				creep.moveTo(targetObj, {visualizePathStyle: {stroke: '#ffffff'}});
            			}
            			else if(returnValue == OK || returnValue == ERR_NOT_ENOUGH_RESOURCES || returnValue == ERR_FULL){
            				transportArray.push(target);
            		    	creep.memory.transportList= transportArray.join(";");
            			}
            			else{
            			    console.log('carrier '+creep.name+' withdraw error. target='+targetObj.id+' resourceType='+resourceType+' returnVale='+returnValue);
            			}
        			}
        		}
        		else if(oper==1){
        			//如果当前creep没有携带资源，跳过所有存货动作
        			if(_.sum(creep.carry)==0){
        				transportArray.push(target);
        		    	creep.memory.transportList= transportArray.join(";");
        		    	return;
        			}
        			let returnValue = creep.transfer(targetObj, resourceType);
        			if(returnValue == ERR_NOT_IN_RANGE) {
        	            creep.moveTo(targetObj, {visualizePathStyle: {stroke: '#ffffff'}});
        	        }
        			else if(returnValue == OK || returnValue==ERR_NOT_ENOUGH_RESOURCES || returnValue==ERR_FULL){
        				transportArray.push(target);
        		    	creep.memory.transportList= transportArray.join(";");
        			}
        		}
    		}
    	}
    }
};

module.exports = roleCarrier;