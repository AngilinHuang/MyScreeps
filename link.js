var link = {
    run: function(linkFrom) {
    	const linkStorageId = linkFrom.room.memory.linkStorage;
    	const linkFromIds = linkFrom.room.memory.linkFroms;
    	
    	if(linkFromIds && linkFromIds.length>0){
    		//TODO 如果有采集点link，优先向非storage且能量小于500的link发送能量，其次向能量小于700的storage发送能量
    		
    	}
    	else if(linkStorageId && linkFrom.id==linkStorageId){
    		//如果没有采集点link，则linkStorage负责向其他link发送能量
    		const linkTo = linkFrom.pos.findClosestByRange(FIND_STRUCTURES, {
	            filter: (structure) => {
	                return (structure.structureType == STRUCTURE_LINK &&
	                    		structure.energy < 300)
	                    		;
		            }
		    });	
	    	if(linkTo){
	    		linkFrom.transferEnergy(linkTo);
	    	}
    	}
    }
};

module.exports = link;
