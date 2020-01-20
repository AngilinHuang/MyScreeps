/**
 * link分为4类
 * linkFroms    数组	  source附近的link，只发送不接收		优先传能量给linkTos，其次给linkStorageTo
 * linkStorageTo      storage附近的link，只接收不发送
 * linkStorageFrom    storage附近的link，只发送不接收		传能量给linkTos
 * linkTos	数组		功能建筑(terminal，tower)附近的link，只接收不发送
 * 
 * Game.rooms["E27S25"].memory.linkFroms=['5ccd4389f331cc50b97ca1a2','5cff3692667a4642d424d577']
 * Game.rooms["E27S25"].memory.linkTos=['5cd194a18ca9c74b968ec2a8','5d0115d8fa12b46765927a8c']
 * Game.rooms["E27S25"].memory.linkStorageTo='5ccd3ab22063582490f765de'
 * Game.rooms["E27S25"].memory.linkStorageFrom='5cde0c35e470435ac71ea750'
 * 
 * Game.rooms["E28S25"].memory.linkFroms=['5ccc5d739b896e0ba42fe85f']
 * Game.rooms["E28S25"].memory.linkTos=['5d03415ff25684287ddaae52','5d02098896340866362c2d2a']
 * Game.rooms["E28S25"].memory.linkStorageTo='5ccc5020c0d7300bba217ce2'
 * Game.rooms["E28S25"].memory.linkStorageFrom='5cde73de119e6c0b54b0de9e'
 * 
 * Game.rooms["E27S26"].memory.linkFroms=['5cd0335d0474b64ba28e47d5','5d006b99715f020fa47c4f81']
 * Game.rooms["E27S26"].memory.linkStorageTo='5cd02cc317a27d4b8a143c1a'
 * 
 * Game.rooms["E28S26"].memory.linkFroms=['5cd2385af71a733b9e8c7080']
 * Game.rooms["E28S26"].memory.linkStorageTo='5cd21a5c376757774227c31a'
 * Game.rooms["E28S26"].memory.linkStorageFrom='5ce356459917085da40b558c'
 * Game.rooms["E28S26"].memory.linkTos=['5cd67dd12c989c76659c477e']
 * 
 * Game.rooms["E29S24"].memory.linkStorageTo='5cd6687092e19f45522a9297'
 * 
 * 
 * Game.rooms["E32S26"].memory.linkFroms=['5cf9f6951a35fd098d7ed151','5cfe62f5b955b90a06907b71']
 * Game.rooms["E32S26"].memory.linkStorageTo='5cf9eab5b6dff667734de91d'
 * 

 * 
 * Game.rooms["E31S23"].memory.linkFroms=['5cfb14f88135b1099bc89183','5cff38c9412b366796b5473c']
 * Game.rooms["E31S23"].memory.linkStorageTo='5cfb1870877f9609b316eddc'
 * 
 * Game.rooms["E26S28"].memory.linkFroms=['5d0dc33241a69b286385f6de','5d1ec4ea9454d6373d9f732b']
 * Game.rooms["E26S28"].memory.linkStorageTo='5d0de08a7c87215333a0dcfb'
 * 
 * Game.rooms["E29S18"].memory.linkFroms=['5db1b3cdb2eaaca1e0686765']
 * Game.rooms["E29S18"].memory.linkStorageTo='5db18c4a9a1d1d6088bb3f5d'
 * 
 * Game.rooms["E33S26"].memory.linkFroms=['5de8fd14e2943f1e041ecab2','5ded172037a28f94233178ea']
 * Game.rooms["E33S26"].memory.linkStorageTo='5de8f2c8e1995404ce6c4d27'
 * 
 */
var link = {
    run: function(linkFrom) {
    	const linkStorageFromId = linkFrom.room.memory.linkStorageFrom;
    	const linkStorageToId = linkFrom.room.memory.linkStorageTo;
    	const linkFromIds = linkFrom.room.memory.linkFroms;
    	const linkToIds = linkFrom.room.memory.linkTos;
    	
    	if(linkFrom.cooldown!=undefined && linkFrom.cooldown>0){
    		return;
    	}
    	
    	if(linkFromIds && linkFromIds.indexOf(linkFrom.id)!=-1){
    		//如果有采集点link，优先向非storage且能量小于400的link发送能量
    		//似乎写了能量多少就会等到自己有了这些能量后才传
    		//写了对方600以下，己方200以上传能量，结果等到己方600才传能量
    		if(linkToIds){
    			const linkTo = linkFrom.pos.findClosestByRange(FIND_STRUCTURES, {
    	            filter: (structure) => {
    	                return (structure.structureType == STRUCTURE_LINK &&
    	                    		structure.store[RESOURCE_ENERGY] < 400 && linkToIds.indexOf(structure.id)!=-1)
    	                    		;
    		            }
    		    });	
    	    	if(linkTo){
    	    		if(linkFrom.store[RESOURCE_ENERGY]>=300){
    	    			linkFrom.transferEnergy(linkTo);
    	    		}
    	    		return;
    	    	}
    		}
    		
    		if(linkStorageToId){
    			const linkTo = linkFrom.pos.findClosestByRange(FIND_STRUCTURES, {
    	            filter: (structure) => {
    	                return (structure.structureType == STRUCTURE_LINK &&
    	                    		structure.store[RESOURCE_ENERGY] < 400 && structure.id==linkStorageToId)
    	                    		;
    		            }
    		    });	
    	    	if(linkTo){
    	    		if(linkFrom.store[RESOURCE_ENERGY]>=300){
    	    			linkFrom.transferEnergy(linkTo);
    	    		}
    	    		return;
    	    	}
    		}
    	}
    	else if(linkStorageFromId && linkFrom.id==linkStorageFromId && linkToIds ){
    		//如果没有采集点link，则linkStorage负责向其他link发送能量
    		const linkTo = linkFrom.pos.findClosestByRange(FIND_STRUCTURES, {
	            filter: (structure) => {
	                return (structure.structureType == STRUCTURE_LINK &&
	                    		structure.store[RESOURCE_ENERGY] < 150 && linkToIds.indexOf(structure.id)!=-1)
	                    		;
		            }
		    });	
	    	if(linkTo && linkFrom.store[RESOURCE_ENERGY]>=700){
	    		linkFrom.transferEnergy(linkTo);
	    	}
    	}
    }
};

module.exports = link;
