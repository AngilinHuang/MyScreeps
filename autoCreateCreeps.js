var autoCreateCreeps = {
	
		
		
    create: function() {
    	
    	const defaultHarvesterCount = 2;
    	const defaultUpgraderCount = 1;
    	const defaultBuilderCount = 1;
    	const defaultRepairCount = 1;
    	
    	//使用outsourcing远程支持新占房间时，优先发送upgrader和builder，等到基建完成后再发送harvester
    	let outsourcingSupport = {room:'W15S19',builderCount:2,upgraderCount:2,harvesterCount:1,repairCount:0};
    	
    	//let carrierCount = 1;
    	
    	const worker200 = [WORK,CARRY,MOVE];
    	const worker400 = [WORK,WORK,CARRY,CARRY,MOVE,MOVE];
    	
    	const worker300 = [WORK,WORK,CARRY,MOVE];//init | 2tick on road | 3tick on plain | 15tick on swamp
    	const worker450 = [WORK,WORK,WORK,CARRY,MOVE,MOVE];//lv2 with 3 extension | 6energy/tick | 1tick on road | 2tick on plain | 10tick on swamp
    	const worker700 = [WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE];//lv3 with 8 extension | 10energy/tick| 1tick on road | 2tick on plain | 10tick on swamp
    	const builder650 = [WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE];
    	const upgrader800 = [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];//lv3 with 10 extension
    	const worker1050 = [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE];
    	const upgrader1000 = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
    	const builder800 = [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
    	//const carrier1200 = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
    	
    	
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
    			if(room.controller.level==1 || room.controller.level==2){
    				harvesterCount = 2;
    				upgraderCount = 2;
    				builderCount = 1;
    				repairCount = 0;
    			}
    			else if(room.controller.level==8){
    				upgraderCount = 0;
    			}
    			
    			//根据当前room储存的资源存储最大上限，计算工人模板
    			let workerTemplate = worker200;
    			let builderTemplate = worker200;
    			let repairerTemplate = worker200;
    			let upgraderTemplate = worker200;
    			
    			//1300到1800范围说明是5级，且此时已经造好link了，upgrader牺牲移动换工作效率
    			if(room.energyCapacityAvailable>=1500){
    				workerTemplate = worker1050;
    				builderTemplate = builder800;
    				repairerTemplate = builder800;
    				upgraderTemplate = upgrader1000;
    			}
    			//4级
    			else if(room.energyCapacityAvailable>=1300){
    				workerTemplate = worker1050;
    				builderTemplate = builder800;
    				repairerTemplate = builder800;
    				upgraderTemplate = worker1050;
    			}
    			//3级满extension  路修完之后
    			else if(room.energyCapacityAvailable>=800){
    				workerTemplate = worker700;
    				builderTemplate = builder650;
    				repairerTemplate = builder650;
    				upgraderTemplate = upgrader800;
    			}
    			else if(room.energyCapacityAvailable>=450){
    				/*workerTemplate = worker450;
    				builderTemplate = worker450;
    				repairerTemplate = worker450;
    				upgraderTemplate = worker450;*/
    				workerTemplate = worker400;
    				builderTemplate = worker400;
    				repairerTemplate = worker400;
    				upgraderTemplate = worker400;
    			}
    			
    			var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.room==room);
    	    	//复活用（因为能量会自动恢复到300）
    			if(harvesters.length==0) {
    				const newName = 'Harvester' + Game.time;
    	            spawns[0].spawnCreep(worker300, newName,
    	                {memory: {role: 'harvester', room:name}});
    	            return;
    	        }
    	    	else if(harvesters.length < harvesterCount) {
    	    		const newName = 'Harvester' + Game.time;
    	            spawns[0].spawnCreep(workerTemplate, newName,
    	                {memory: {role: 'harvester', room:name}});
    	            return;
    	        }

    			const builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.room==room);
    	        if(builders.length < builderCount) {
    	        	const newName = 'Builder' + Game.time;
    	            spawns[0].spawnCreep(builderTemplate, newName,
    	                {memory: {role: 'builder', room:name}});
    	            return;
    	        }
    	        const upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.room==room);
    	        if(upgraders.length < upgraderCount) {
    	        	const newName = 'Upgrader' + Game.time;
    	            spawns[0].spawnCreep(upgraderTemplate, newName,
    	                {memory: {role: 'upgrader', room:name}});
    	            return;
    	        }
    	        const repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer' && creep.room==room);
    	        if(repairers.length < repairCount) {
    	            const newName = 'Repairer' + Game.time;
    	            spawns[0].spawnCreep(repairerTemplate, newName,
    	                {memory: {role: 'repairer', room:name}});
    	            return;
    	        }
    	        
    	        //不知道有了多个room之后，这段代码会不会导致多个房间同时生产
    	        //如果有问题，就要记录到memory里
    	        if(outsourcingSupport && outsourcingSupport.builderCount>0 && outsourcingSupport.builderCount>_.filter(Game.creeps, (creep) => creep.memory.targetRole == 'builder').length){
    	        	outsourcingSupport.builderCount=outsourcingSupport.builderCount-1;
    	        	spawns[0].spawnCreep(builder800,'OutsourcingBuilder'+Game.time,{ memory: { role:'outsourcing' ,targetRole: 'builder', target: outsourcingSupport.room, room:outsourcingSupport.room } } );
    	        	return;
    	    	}
    	        if(outsourcingSupport && outsourcingSupport.upgraderCount>0 && outsourcingSupport.upgraderCount>_.filter(Game.creeps, (creep) => creep.memory.targetRole == 'upgrader').length){
    	        	outsourcingSupport.upgraderCount=outsourcingSupport.upgraderCount-1;
    	        	spawns[0].spawnCreep(builder800,'OutsourcingUpgrader'+Game.time,{ memory: { role:'outsourcing' ,targetRole: 'upgrader', target: outsourcingSupport.room, room:outsourcingSupport.room } } );
    	        	return;
    	    	}
    	        if(outsourcingSupport && outsourcingSupport.harvesterCount>0 && outsourcingSupport.harvesterCount>_.filter(Game.creeps, (creep) => creep.memory.targetRole == 'harvester').length){
    	        	outsourcingSupport.harvesterCount=outsourcingSupport.harvesterCount-1;
    	        	spawns[0].spawnCreep(worker1050,'OutsourcingHarvester'+Game.time,{ memory: { role:'outsourcing' ,targetRole: 'harvester', target: outsourcingSupport.room, room:outsourcingSupport.room } } );
    	        	return;
    	    	}
    	        if(outsourcingSupport && outsourcingSupport.repairCount>0 && outsourcingSupport.repairCount>_.filter(Game.creeps, (creep) => creep.memory.targetRole == 'repairer').length){
    	        	outsourcingSupport.repairCount=outsourcingSupport.repairCount-1;
    	        	spawns[0].spawnCreep(builder800,'OutsourcingRepairer'+Game.time,{ memory: { role:'outsourcing' ,targetRole: 'repairer', target: outsourcingSupport.room, room:outsourcingSupport.room } } );
    	        	return;
    	    	}
    	        
    	        if(spawns[0].spawning) {
    	            const spawningCreep = Game.creeps[spawns[0].spawning.name];
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
