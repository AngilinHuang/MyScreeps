var creepUtil = {
		
    concentrateToFlag: function(creep, flagColor) {
        var flags = creep.room.find(FIND_FLAGS, {
            filter: (flag) => {return flag.color==flagColor;
            }
        });
        if(flags.length>0){
        	creep.moveTo(flags[0], {visualizePathStyle: {stroke: '#ffffff'}});
        }
    },

	harvestClosestEnergy: function(creep){
		var source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
		if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
		    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffffff'}});
		}
	}


};

module.exports = creepUtil;