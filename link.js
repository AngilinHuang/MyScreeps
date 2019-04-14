
// Game.rooms["W15S19"].memory.linkFrom='5cb1dfd0ac024111776edfbc'
var link = {
    run: function(linkFrom) {
    	const linkStorageId = linkFrom.room.memory.linkStorage;
    	const linkFromId = linkFrom.room.memory.linkFrom;
    	
    	if(linkFromId && linkFromId==linkFrom.id){
    		//如果有采集点link，优先向非storage且能量小于400的link发送能量
    		//似乎写了能量多少就会等到自己有了这些能量后才传
    		//写了对方600以下，己方200以上传能量，结果等到己方600才传能量
    		//TODO 其次向能量小于700的storage发送能量
    		const linkTo = linkFrom.pos.findClosestByRange(FIND_STRUCTURES, {
	            filter: (structure) => {
	                return (structure.structureType == STRUCTURE_LINK &&
	                    		structure.energy < 400 && structure.id!=linkStorageId)
	                    		;
		            }
		    });	
	    	if(linkTo && linkFrom.energy>=200){
	    		linkFrom.transferEnergy(linkTo);
	    	}
    	}
    	else if(linkStorageId && linkFrom.id==linkStorageId){
    		//如果没有采集点link，则linkStorage负责向其他link发送能量
    		const linkTo = linkFrom.pos.findClosestByRange(FIND_STRUCTURES, {
	            filter: (structure) => {
	                return (structure.structureType == STRUCTURE_LINK &&
	                    		structure.energy < 400)
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
