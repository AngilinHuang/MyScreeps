/**
 * tower功能
 * 1、优先攻击房间内距离最近的hostile creep
 * 2、治疗房间内不满血的己方creep
 */
var structureTower = {
    run: function(tower) {
    	if(tower) {
            const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile) {
                tower.attack(closestHostile);
                return;
            }
            
            const closestDamagedCreep = tower.pos.findClosestByRange(FIND_MY_CREEPS, {
                filter: (creep) => creep.hits < creep.hitsMax
            });
            if(closestDamagedCreep) {
                tower.heal(closestDamagedCreep);
            }
            
            //修理建筑的效率只有creep的1/5，把工作交给repairer
            /*let closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
	            filter: (structure) => structure.hits < structure.hitsMax
	        });
	        if(closestDamagedStructure) {
	            tower.repair(closestDamagedStructure);
	        }*/
        }
    }
};
module.exports = structureTower;