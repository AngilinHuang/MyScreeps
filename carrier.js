var creepUtil = require('creepUtil');


/*
 * carrier功能
 * 可以跨房间运输
 * 0取货 1存货
 * 
 *探针
 *Game.spawns['Spawn4'].spawnCreep([MOVE],'Probe'+Game.time,{ memory: { role:'outsourcing' ,targetRole: 'builder', target: 'E26S27', room:'E26S27'}});
 *
 *防御
 *Game.spawns['Spawn13'].spawnCreep( [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,HEAL,HEAL,HEAL,HEAL,HEAL],'Melee'+Game.time,{ memory: { role: 'meleeAttacker', target: 'E26S26'} });
 *
 * 
 *  
 * 5cdfe108cd8deb5a978c7cba,0,H;5cdfe108cd8deb5a978c7cba,0,U;5ce16ef9cd8deb5a978cea5d,1,H;5ce16ef9cd8deb5a978cea5d,1,U;5ce16ef9cd8deb5a978cea5d,1,energy
 * 5cdfe108cd8deb5a978c7cba,0,O;5cdfe108cd8deb5a978c7cba,0,Z;5ce16ef9cd8deb5a978cea5d,1,O;5ce16ef9cd8deb5a978cea5d,1,Z;5ce16ef9cd8deb5a978cea5d,1,energy
 * 
 * 5ce3fbf59fe4da5efbcf9bf2,0,XKHO2;5ce3fbf59fe4da5efbcf9bf2,0,XLHO2;5ce3fbf59fe4da5efbcf9bf2,0,H;5ce16ef9cd8deb5a978cea5d,1,XKHO2;5ce16ef9cd8deb5a978cea5d,1,XLHO2;5ce16ef9cd8deb5a978cea5d,1,H;5ce16ef9cd8deb5a978cea5d,1,energy
 * 
 * Game.getObjectById('5d05db74c7719631f0b6cf54').memory.transportList='5ce3fbf59fe4da5efbcf9bf2,0,GO;5ce3fbf59fe4da5efbcf9bf2,0,UH;5ce3fbf59fe4da5efbcf9bf2,0,H;5ce16ef9cd8deb5a978cea5d,1,GO;5ce16ef9cd8deb5a978cea5d,1,UH;5ce16ef9cd8deb5a978cea5d,1,H;5ce16ef9cd8deb5a978cea5d,1,energy'
 * Game.getObjectById('5d05de47c889b0336d18a48d').memory.transportList='5ce3fbf59fe4da5efbcf9bf2,0,GHO2;5ce3fbf59fe4da5efbcf9bf2,0,ZHO2;5ce3fbf59fe4da5efbcf9bf2,0,H;5ce16ef9cd8deb5a978cea5d,1,H;5ce16ef9cd8deb5a978cea5d,1,GHO2;5ce16ef9cd8deb5a978cea5d,1,ZHO2;5ce16ef9cd8deb5a978cea5d,1,energy'
 * Game.getObjectById('5d05de700765293387d921ec').memory.transportList='5ce3fbf59fe4da5efbcf9bf2,0,KHO2;5ce3fbf59fe4da5efbcf9bf2,0,UH2O;5ce3fbf59fe4da5efbcf9bf2,0,H;5ce16ef9cd8deb5a978cea5d,1,KHO2;5ce16ef9cd8deb5a978cea5d,1,UH2O;5ce16ef9cd8deb5a978cea5d,1,H;5ce16ef9cd8deb5a978cea5d,1,energy'
 *
 *
 * 
 * 
 */
var roleCarrier = {
    run: function(creep) {

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
        			if(creep.store.getUsedCapacity()==creep.store.getCapacity()){
        				transportArray.push(target);
        		    	creep.memory.transportList= transportArray.join(";");
        		    	return;
        			}
        			//console.log(creep.name+' target='+targetObj.id);
        			if(!creepUtil.harvestNearbyTombstone(creep)){
        				const returnValue = creep.withdraw(targetObj, resourceType);
            			if(returnValue == ERR_NOT_IN_RANGE) {
            				creep.moveTo(targetObj, {visualizePathStyle: {stroke: '#ffffff'}});
            			}
            			else if(returnValue == OK || returnValue == ERR_NOT_ENOUGH_RESOURCES || returnValue == ERR_FULL){
            				transportArray.push(target);
            		    	creep.memory.transportList= transportArray.join(";");
            			}
            			else if(returnValue != ERR_BUSY){
            			    console.log('carrier '+creep.name+' withdraw error. target='+targetObj.id+' resourceType='+resourceType+' returnVale='+returnValue);
            			}
        			}
        		}
        		else if(oper==1){
        			//如果当前creep没有携带资源，跳过所有存货动作
        			if(creep.store.getUsedCapacity()==0){
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
    		else{
    		    transportArray.push(target);
        	    creep.memory.transportList= transportArray.join(";");
    		}
    	}
    	else{
    	    transportArray.push(target);
        	creep.memory.transportList= transportArray.join(";");
    	}
    }
};

module.exports = roleCarrier;