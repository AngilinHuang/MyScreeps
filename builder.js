var creepUtil = require('creepUtil');

var roleBuilder = {

    run: function(creep) {
        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
        }

        if(creep.memory.building) {
        	//从最近的建造点开始建造
            var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            if(target) {
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else{
            	creepUtil.concentrateToFlag(creep, COLOR_WHITE);
            }
        }
        else {
        	creepUtil.harvestClosestEnergy(creep);
        }
    }
};

module.exports = roleBuilder;