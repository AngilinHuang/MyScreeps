var autoCreateCreeps = {
	
		
		
    create: function() {
    	
    	const defaultHarvesterCount = 2;
    	const defaultUpgraderCount = 3;
    	const defaultBuilderCount = 1;
    	const defaultRepairCount = 1;
    	
    	const defaultWorker = [WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE];
    	const worker300 = [WORK,WORK,CARRY,MOVE];//init | 2tick on road | 3tick on plain | 15tick on swamp
    	const worker450 = [WORK,WORK,WORK,CARRY,MOVE,MOVE];//lv2 with 3 extension | 6energy/tick | 1tick on road | 2tick on plain | 10tick on swamp
    	const worker550 = [WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE];//lv2 with 5 extension | 8energy/tick | 2tick on road | 3tick on plain | 13tick on swamp
    	const worker700 = [WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE];//lv3 with 8 extension | 10energy/tick| 1tick on road | 2tick on plain | 10tick on swamp
    	
    	for(let name in Game.rooms){
    		let room = Game.rooms[name];
    		let spawns = room.find(FIND_MY_SPAWNS);
    		if(spawns.length>0){
    			//计算当前房间每300tick的能量总和
    			let energyCapacity = 0;
    			let resources = room.find(FIND_SOURCES);
    			for(let i=0;i<resources.length;i++){
    				energyCapacity += resources[i].energyCapacity;
    			}
    			
    			let harvesterCount = defaultHarvesterCount;
    			let upgraderCount = defaultUpgraderCount;
    			let builderCount = defaultBuilderCount;
    			let repairCount = defaultRepairCount;
    			if(room.controller.level==1){
    				upgraderCount = upgraderCount-1;
    				repairCount = repairCount-1;
    			}
    			else if(room.controller.level==2){
    				repairCount = repairCount-1;
    			}
    			else if(room.controller.level==8){
    				upgraderCount = 1;
    			}
    			else if(resources.length==1){
    				upgraderCount = upgraderCount-2;
    				builderCount = builderCount-1;
    			}
    			else if(energyCapacity<=3000){
    				upgraderCount = upgraderCount-1;
    			}

    			
    			//根据当前room储存的资源存储最大上限，计算工人模板
    			let workerTemplate = worker300;
    			let builderTemplate = worker300;
    			if(room.energyCapacityAvailable>=700){
    				workerTemplate = worker700;
    				builderTemplate = worker700;
    			}
    			else if(room.energyCapacityAvailable>=550){
    				workerTemplate = worker550;
    				builderTemplate = worker550;
    			}
    			else if(room.energyCapacityAvailable>=450){
    				workerTemplate = worker450;
    				builderTemplate = worker450;
    			}
    			
    			var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.room==room);
    	    	if(harvesters.length==0) {
    	            var newName = 'Harvester' + Game.time;
    	            spawns[0].spawnCreep(worker300, newName,
    	                {memory: {role: 'harvester'}});
    	            return;
    	        }
    	    	else if(harvesters.length < harvesterCount) {
    	            var newName = 'Harvester' + Game.time;
    	            spawns[0].spawnCreep(workerTemplate, newName,
    	                {memory: {role: 'harvester'}});
    	            return;
    	        }

    	    	var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.room==room);
    	        if(builders.length < builderCount) {
    	            var newName = 'Builder' + Game.time;
    	            spawns[0].spawnCreep(builderTemplate, newName,
    	                {memory: {role: 'builder'}});
    	            return;
    	        }
    	        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.room==room);
    	        if(upgraders.length < upgraderCount) {
    	            var newName = 'Upgrader' + Game.time;
    	            spawns[0].spawnCreep(workerTemplate, newName,
    	                {memory: {role: 'upgrader'}});
    	            return;
    	        }
    	        var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer' && creep.room==room);
    	        if(repairers.length < repairCount) {
    	            var newName = 'Repairer' + Game.time;
    	            spawns[0].spawnCreep(workerTemplate, newName,
    	                {memory: {role: 'repairer'}});
    	            return;
    	        }
    	        
    	        if(spawns[0].spawning) {
    	            var spawningCreep = Game.creeps[spawns[0].spawning.name];
    	            room.visual.text(
    	                spawningCreep.memory.role,
    	                spawns[0].pos.x + 1,
    	                spawns[0].pos.y,
    	                {align: 'left', opacity: 0.8});
    	        }
    		}
    	}
    }
};

module.exports = autoCreateCreeps;
