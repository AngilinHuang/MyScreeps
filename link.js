/**
 * link分为4类
 * linkFroms    数组	  source附近的link，只发送不接收		优先传能量给linkTos，其次给linkStorageTo
 * linkStorageTo      storage附近的link，只接收不发送
 * linkStorageFrom    storage附近的link，只发送不接收		传能量给linkTos
 * linkTos	数组		功能建筑(terminal，tower)附近的link，只接收不发送
 * 
 * Game.rooms["E27S25"].memory.linkFroms=['5ccd4389f331cc50b97ca1a2']
 * Game.rooms["E27S25"].memory.linkTos=['5cd194a18ca9c74b968ec2a8']
 * Game.rooms["E27S25"].memory.linkStorageTo='5ccd3ab22063582490f765de'
 * 
 * Game.rooms["E28S25"].memory.linkFroms=['5ccc5d739b896e0ba42fe85f']
 * Game.rooms["E28S25"].memory.linkTos=['5cd123f1e1b0d7774a40e584']
 * Game.rooms["E28S25"].memory.linkStorageTo='5ccc5020c0d7300bba217ce2'
 * 
 * Game.rooms["E27S26"].memory.linkFroms=['5cd0335d0474b64ba28e47d5']
 * Game.rooms["E27S26"].memory.linkStorageTo='5cd02cc317a27d4b8a143c1a'
 * 
 * Game.rooms["E28S26"].memory.linkFroms=['5cd2385af71a733b9e8c7080']
 * Game.rooms["E28S26"].memory.linkStorageTo='5cd21a5c376757774227c31a'
 * 
 * Game.rooms["E29S24"].memory.linkFroms=['5cd67942d2f87745279f4ecc']
 * Game.rooms["E29S24"].memory.linkStorageTo='5cd6687092e19f45522a9297'
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
    		//注意，如果不填transfer的能量，默认为当前link的全部能量。如果接收者没有足够空间，会导致传输失败。
    		if(linkToIds){
    			const linkTo = linkFrom.pos.findClosestByRange(FIND_STRUCTURES, {
    	            filter: (structure) => {
    	                return (structure.structureType == STRUCTURE_LINK &&
    	                    		structure.energy < 400 && linkToIds.indexOf(structure.id)!=-1)
    	                    		;
    		            }
    		    });	
    	    	if(linkTo){
    	    		if(linkFrom.energy>=200){
    	    			linkFrom.transferEnergy(linkTo);
    	    		}
    	    		return;
    	    	}
    		}
    		
    		if(linkStorageToId){
    			const linkTo = linkFrom.pos.findClosestByRange(FIND_STRUCTURES, {
    	            filter: (structure) => {
    	                return (structure.structureType == STRUCTURE_LINK &&
    	                    		structure.energy < 400 && structure.id==linkStorageToId)
    	                    		;
    		            }
    		    });	
    	    	if(linkTo){
    	    		if(linkFrom.energy>=200){
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
	                    		structure.energy < 400 && linkToIds.indexOf(structure.id)!=-1)
	                    		;
		            }
		    });	
	    	if(linkTo && linkFrom.energy>=200){
	    		linkFrom.transferEnergy(linkTo);
	    	}
    	}
    }
};

module.exports = link;
