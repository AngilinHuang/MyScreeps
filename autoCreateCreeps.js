var autoCreateCreeps = {
	
		
		
    create: function() {
    	
    	const defaultHarvesterCount = 2;
    	const defaultUpgraderCount = 1;
    	const defaultBuilderCount = 1;
    	const defaultRepairCount = 1;
    	const defaultExtracterCount = 0;
    	const defaultWallRepairerCount = 0;
    	
    	const worker200 = [WORK,CARRY,MOVE];
    	const worker400 = [WORK,WORK,CARRY,CARRY,MOVE,MOVE];
    	const worker300 = [WORK,WORK,CARRY,MOVE];//init | 2tick on road | 3tick on plain | 15tick on swamp  只适用于初期造好container后的harvester
    	const worker450 = [WORK,WORK,WORK,CARRY,MOVE,MOVE];//lv2 with 3 extension | 6energy/tick | 1tick on road | 2tick on plain | 10tick on swamp
    	const worker550 = [WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE];
    	const worker700 = [WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE];//lv3 with 8 extension | 10energy/tick| 1tick on road | 2tick on plain | 10tick on swamp
    	const builder650 = [WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE];
    	const upgrader800 = [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];//lv3 with 10 extension
    	const worker1000 = [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE];
    	const builder1100 = [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
    	const upgrader950 = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE];
    	const builder800 = [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
    	const upgrader1150 = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE];
    	const upgrader1350 = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
    	const upgrader1550 = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
    	const upgrader1600 = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE];
    	const upgrader1800 = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
    	const upgrader1900 = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE];
    	const upgrader2100 = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
    	const worker1300 = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
    	const carrier100 = [CARRY,MOVE];
    	const carrier150 = [CARRY,CARRY,MOVE];
    	const carrier300 = [CARRY,CARRY,CARRY,CARRY,MOVE,MOVE];
    	const carrier450 = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
    	const carrier550 = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
    	const carrier600 = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
    	const carrier750 = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE];
    	const carrier900 = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
    	const carrier1050 = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
    	const carrier1200 = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
    	const carrier1500 = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
    	const carrier1650 = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];	
    	const carrier1800 = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
    	const carrierNoRoad1000 = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
    	const claimer650 = [CLAIM,MOVE];
    	const claimer1300 = [CLAIM,MOVE,CLAIM,MOVE];
    	const claimer1950 = [CLAIM,MOVE,CLAIM,MOVE,CLAIM,MOVE];
    	const claimer2600 = [CLAIM,MOVE,CLAIM,MOVE,CLAIM,MOVE,CLAIM,MOVE];
    	const reserveRoomDefender = [TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK];
    	const reserveRoomDefender560 = [TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK];
    	const reserveRoomDefender760 = [TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,MOVE];
    	const extracter650 = [WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE];
    	//500hits/tick  150ticks per turn   75Khits per turn
    	const wallRepairer1750 = [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
    	
    	//使用outsourcing远程支持新占房间时，优先发送upgrader和builder，等到基建完成后再发送harvester
    	//也能支持远程reserve采矿
    	//支持passThroughRoom:'W15S17'，应对novice和respawn区的墙
    	let outsourcingSupports = [{creater:'E27S25',room:'E27S24',builderCount:0,upgraderCount:0,harvesterCount:0,repairCount:0,reserveHarvesterCount:1,targetObj:'5ccc0ce1ebc56128a5d19997'},
    	{creater:'E28S26',room:'E29S26',builderCount:0,upgraderCount:0,harvesterCount:0,repairCount:0,reserveHarvesterCount:1},
    	{creater:'E29S24',room:'E29S25',builderCount:0,upgraderCount:0,harvesterCount:0,repairCount:0,reserveHarvesterCount:1},
    	{creater:'E29S24',room:'E28S24',builderCount:0,upgraderCount:0,harvesterCount:0,repairCount:0,reserveHarvesterCount:1},
    	{creater:'E29S24',room:'E29S23',builderCount:0,upgraderCount:0,harvesterCount:0,repairCount:0,reserveHarvesterCount:1}];
    	
    	
    	//carrier列表
    	const carriers = [{creater:'E28S25',routeId:1, template:carrier100, transportList: '5ccc5020c0d7300bba217ce2,0,'+RESOURCE_ENERGY+';5cca66cd3a071f4bbccb3e74,1,'+RESOURCE_ENERGY},
    		{creater:'E28S25',routeId:2, template:carrier600, transportList: '5cca66cd3a071f4bbccb3e74,0,'+RESOURCE_ENERGY+';5cc958509b896e0ba42ec5f6,1,'+RESOURCE_ENERGY},
    		{creater:'E27S25',routeId:3, template:carrier100, transportList: '5ccd3ab22063582490f765de,0,'+RESOURCE_ENERGY+';5ccbe3bc3a071f4bbccbc5f8,1,'+RESOURCE_ENERGY},
    		{creater:'E27S25',routeId:4, template:carrier1500, transportList: '5ccbe3bc3a071f4bbccbc5f8,0,'+RESOURCE_ENERGY+';5cd64b529cc2ad1e497695be,1,'+RESOURCE_ENERGY},
    		//E27S24 reserve
    		{creater:'E27S25',routeId:7, template:carrier900, dangerRooms:['E27S24'], transportList: '5ccc0ce1ebc56128a5d19997,0,'+RESOURCE_ENERGY+';5ccae42ad0a8750bc055ce69,1,'+RESOURCE_ENERGY+';5ccbe3bc3a071f4bbccbc5f8,1,'+RESOURCE_ENERGY},
    		{creater:'E27S26',routeId:8, template:carrier100, transportList: '5cd02cc317a27d4b8a143c1a,0,'+RESOURCE_ENERGY+';5cce656639593024965404d4,1,'+RESOURCE_ENERGY},
    		{creater:'E28S26',routeId:10, template:carrier150, transportList: '5cd21a5c376757774227c31a,0,'+RESOURCE_ENERGY+';5cd025e13a071f4bbccd384f,1,'+RESOURCE_ENERGY},
    		//E29S26 reserve
    		{creater:'E28S26',routeId:13, template:carrier1200, dangerRooms:['E29S26'], transportList: '5cd0fdce389fcd24bc6f4ddf,0,'+RESOURCE_ENERGY+';5cd1083a6f63db24c20e580a,1,'+RESOURCE_ENERGY},
    		//E29S25 reserve
    		{creater:'E29S24',routeId:14, template:carrier1500, dangerRooms:['E29S25'], transportList: '5cd10ec9d03a6160895ac731,0,'+RESOURCE_ENERGY+';5cd54e06c689c47656221b63,1,'+RESOURCE_ENERGY},
    		{creater:'E29S24',routeId:15, template:carrier150, transportList: '5cd6687092e19f45522a9297,0,'+RESOURCE_ENERGY+';5cd54e06c689c47656221b63,1,'+RESOURCE_ENERGY},
    		{creater:'E29S24',routeId:16, template:carrier600, transportList: '5cd25e581d4dc950a17aa578,0,'+RESOURCE_ENERGY+';5cd54e06c689c47656221b63,1,'+RESOURCE_ENERGY},
    		//E28S24 reserve
    		{creater:'E29S24',routeId:17, template:carrier1500, dangerRooms:['E28S24'], transportList: '5cd4dca26071bb3e788e4a4e,0,'+RESOURCE_ENERGY+';5cd54e06c689c47656221b63,1,'+RESOURCE_ENERGY},
    		//E29S23 reserve
    		{creater:'E29S24',routeId:18, template:carrier1050, dangerRooms:['E29S23'], transportList: '5cd56c100c2acc3d266a1e4e,0,'+RESOURCE_ENERGY+';5cd54e06c689c47656221b63,1,'+RESOURCE_ENERGY},
    		//E29S23 reserve
    		{creater:'E29S24',routeId:19, template:carrier900, dangerRooms:['E29S23'], transportList: '5cd56c100c2acc3d266a1e4e,0,'+RESOURCE_ENERGY+';5cd54e06c689c47656221b63,1,'+RESOURCE_ENERGY}];
    	
    		
    	
    	//clamers列表，主要用于reserve
    	//4级满ex可用模板claimer1300，6级可以模板claimer1950,7级可以模板claimer2600
    	//支持passThroughRoom:'W15S17'，应对novice和respawn区的墙
    	const claimers = [{creater:'E27S25',template:claimer1300, target: 'E27S24', oper:'reserve' },
    	                {creater:'E28S26',template:claimer1950, target: 'E29S26', oper:'reserve' },
    	                {creater:'E28S26',template:claimer1950, target: 'E29S25', oper:'reserve', targetObj:'5bbcaea99099fc012e63964b' },
    	                {creater:'E29S24',template:claimer1300, target: 'E28S24', oper:'reserve' },
    	                {creater:'E29S24',template:claimer1300, target: 'E29S23', oper:'reserve' }];
    	
    	
    	/*try{
    		if(Game.rooms['W15S18'].memory.threatLevel!=undefined && Game.rooms['W15S18'].memory.threatLevel>0){
    			if(_.filter(Game.creeps, (creep) => creep.memory.role == 'warCharger' && creep.memory.target=='W15S18').length<1){
    				Game.spawns['Spawn4'].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'WarCharger'+Game.time,{memory: {role: 'warCharger', room:'W15S18'}});
    			}
    			if(_.filter(Game.creeps, (creep) => creep.memory.role == 'repairer' && creep.memory.target=='W15S18').length<2){
    				Game.spawns['Spawn3'].spawnCreep( [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK],'Repairer'+Game.time,{ memory: { role: 'repairer', target: 'W15S18'} } );
    			}
    		}
    		
    	}
    	catch(err){
    		console.log(err);
    	}
    	
    	//Game.spawns['Spawn2'].spawnCreep( [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK],'Repairer'+Game.time,{ memory: { role: 'repairer', target: 'W15S19'} } );
    	
    	
    	
        //TODO reserve room的防御者，只要比1000血的invader强点就行了
    	//单个还可以对付，遇到5个，1混合3治疗1远程组合就被堵门了
    	if(Game.rooms['W15S17']&&Game.rooms['W15S17'].memory.threatLevel>0
    			&& _.filter(Game.creeps, (creep) => creep.memory.role == 'meleeAttacker').length<2){
    		if(Game.rooms['W15S17'].memory.threatLevel>4){
    			//TODO 最好是刷一个近战远程混合怪
    			Game.spawns['Spawn3'].spawnCreep( reserveRoomDefender560,'Melee'+Game.time,{ memory: { role: 'meleeAttacker', target: 'W15S17'} } );
    		}
    		else{
    			Game.spawns['Spawn3'].spawnCreep( reserveRoomDefender560,'Melee'+Game.time,{ memory: { role: 'meleeAttacker', target: 'W15S17'} } );
    		}
    	}
    	else if(Game.rooms['W14S17']&&Game.rooms['W14S17'].memory.threatLevel>0
    			&& _.filter(Game.creeps, (creep) => creep.memory.role == 'meleeAttacker').length<2){
    		if(Game.rooms['W15S17'].memory.threatLevel>4){
    			//TODO 最好是刷一个近战远程混合怪
    			Game.spawns['Spawn3'].spawnCreep( reserveRoomDefender560,'Melee'+Game.time,{ memory: { role: 'meleeAttacker', target: 'W14S17', passThroughRoom: 'W15S17'} } );
    		}
    		else{
    			Game.spawns['Spawn3'].spawnCreep( reserveRoomDefender560,'Melee'+Game.time,{ memory: { role: 'meleeAttacker', target: 'W14S17', passThroughRoom: 'W15S17'} } );
    		}
    	}
    	
    	if(_.filter(Game.creeps, (creep) => creep.memory.role == 'meleeAttacker' && creep.memory.target=='W14S17').length<1){
            Game.spawns['Spawn3'].spawnCreep( reserveRoomDefender,'Melee'+Game.time,{ memory: { role: 'meleeAttacker', target: 'W14S17', passThroughRoom: 'W15S17'} } );
        }
    	
    	if(Game.rooms['W16S19'] && !Game.rooms['W16S19'].controller.my && (Game.rooms['W16S19'].controller.upgradeBlocked==undefined||Game.rooms['W16S19'].controller.upgradeBlocked<300) && _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer' && creep.memory.target=='W16S19').length<1){
    		Game.spawns['Spawn3'].spawnCreep(  [CLAIM,MOVE,CLAIM,MOVE,CLAIM,MOVE,CLAIM,MOVE,CLAIM,MOVE,CLAIM,MOVE,CLAIM,MOVE,CLAIM,MOVE],'Claimer'+Game.time,{ memory: { role: 'claimer',  target: 'W16S19',oper:'claim' } } );
    		console.log('tryToDowngrade');
    	}*/
    	if(_.filter(Game.creeps, (creep) => creep.memory.role == 'meleeAttacker' && creep.memory.target=='E29S26').length<1){
            Game.spawns['Spawn3'].spawnCreep( reserveRoomDefender760,'Melee'+Game.time,{ memory: { role: 'meleeAttacker', target: 'E29S26'} } );
        }
        if(_.filter(Game.creeps, (creep) => creep.memory.role == 'meleeAttacker' && creep.memory.target=='E29S23').length<1){
            Game.spawns['Spawn5'].spawnCreep( reserveRoomDefender760,'Melee'+Game.time,{ memory: { role: 'meleeAttacker', target: 'E29S23'} } );
        }
        if(_.filter(Game.creeps, (creep) => creep.memory.role == 'meleeAttacker' && creep.memory.target=='E29S25').length<1){
            Game.spawns['Spawn5'].spawnCreep( reserveRoomDefender760,'Melee'+Game.time,{ memory: { role: 'meleeAttacker', target: 'E29S25'} } );
        }
    	
    	
    	for(let name in Game.rooms){
    		
//    		if(name=='W15S18'||name=='W15S19'){
//    			continue;
//    		}
    		
    		const room = Game.rooms[name];
    		const spawns = room.find(FIND_MY_SPAWNS);
    		//console.log(name+' spawnsCount='+spawns.length);
    		if(spawns.length>0){
    			let vacantSpawn;
    			for(let i=0;i<spawns.length;i++){
    				if(spawns[i].spawning) {
        	            const spawningCreep = Game.creeps[spawns[i].spawning.name];
        	            room.visual.text(
        	                spawningCreep.memory.role,
        	                spawns[i].pos.x + 1,
        	                spawns[i].pos.y,
        	                {align: 'left', opacity: 0.8});
        	        }
    				else{
    					vacantSpawn = spawns[i];
    					break;
    				}
    			}
    			if(vacantSpawn == undefined){
    				continue;
    			}
    			
    			
    			//计算当前房间每300tick的能量总和
    			let energyCapacity = 0;
    			const resources = room.find(FIND_SOURCES);
    			for(let i=0;i<resources.length;i++){
    				energyCapacity += resources[i].energyCapacity;
    			}
    			
    			let harvesterCount = defaultHarvesterCount;
    			let upgraderCount = defaultUpgraderCount;
    			let builderCount = defaultBuilderCount;
    			let repairCount = defaultRepairCount;
    			let extracterCount = defaultExtracterCount;
    			let wallRepairerCount = defaultWallRepairerCount;
    			if(room.controller.level==1 || room.controller.level==2 ){
    				/*这样写不行，怎么判断只有一个房间
    				 * 
    				 * if(Game.rooms.length==1){
    					
    				}*/
    				harvesterCount = 0;
    				upgraderCount = 0;
    				builderCount = 0;
    				repairCount = 0;
    			}
    			else if(room.controller.level==3 ){
    			    
    				harvesterCount = 0;
    				upgraderCount = 0;
    				builderCount = 1;
    				repairCount = 1;
    			}
    			else if(room.controller.level==4){
    				/*harvesterCount = 2;
    				upgraderCount = 0;
    				builderCount = 1;
    				repairCount = 1;*/
    			}
    			else if(room.controller.level==5){
    			    /*harvesterCount = 2;
    				upgraderCount = 1;
    				builderCount = 1;
    				repairCount = 1;*/
    			}
    			else if(room.controller.level==6){
    				upgraderCount = 1;
    			}
    			else if(room.controller.level==7){
    				upgraderCount = 1;
    			}
    			else if(room.controller.level==8){
    				upgraderCount = 0;
    				wallRepairerCount = 1;
    			}
    			
    			if(resources.length==1 && harvesterCount>1){
    				harvesterCount = 1;
    				if(room.controller.level>=6){
    				    upgraderCount = 0;
    			    }
    			}
    			
    			//通过是否有extractor和mineral储量来判断是否建造extracter，在storage中包含300K该种矿物后停止建造extracter
    			if(room.controller.level>=6){
    				const extractor = room.controller.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => structure.structureType == STRUCTURE_EXTRACTOR});
    				if(extractor){
    					const mineral = room.controller.pos.findClosestByRange(FIND_MINERALS);
    					if(mineral && mineral.mineralAmount>0 && room.storage && (room.storage.store[mineral.mineralType]==undefined || room.storage.store[mineral.mineralType]<3000000)){
    						extracterCount = 1;
    					}
    				}
    			}
    			
    			//根据当前room储存的资源存储最大上限，计算工人模板
    			let workerTemplate = worker300;
    			let builderTemplate = worker200;
    			let repairerTemplate = worker200;
    			let upgraderTemplate = worker200;
    			let wallRepairerTemplate = wallRepairer1750;
    			
    			//7级基地，需要更高效率的填充extension
    			if(room.energyCapacityAvailable>=5000){
    				workerTemplate = worker1000;
    				builderTemplate = builder1100;
    				repairerTemplate = builder1100;
    				upgraderTemplate = upgrader1150;
    				//upgraderTemplate = upgrader1900;
    			}
    			//5级满extension，且此时已经造好link了，upgrader牺牲移动换工作效率，压缩upgrader数量到1个    1800
    			else if(room.energyCapacityAvailable>=1800){
    				workerTemplate = worker1000;
    				builderTemplate = builder800;
    				repairerTemplate = builder800;
    				upgraderTemplate = upgrader1150;
    				//upgraderTemplate = upgrader1600;
    			}
    			//4级满extension  1300   从这个级别后除upgrader的模板外其他模板基本不改变了
    			else if(room.energyCapacityAvailable>=1150){
    				workerTemplate = worker1000;
    				builderTemplate = builder800;
    				repairerTemplate = builder800;
    				upgraderTemplate = upgrader1150;
    			}
    			//3级满extension 800  路修完之后
    			else if(room.energyCapacityAvailable>=800){
    				workerTemplate = worker700;
    				builderTemplate = builder650;
    				repairerTemplate = builder650;
    				upgraderTemplate = upgrader800;
    			}
    			else if(room.energyCapacityAvailable>=550){
    				workerTemplate = worker550;
    				builderTemplate = worker400;
    				repairerTemplate = worker400;
    				upgraderTemplate = worker550;
    			}
    			else if(room.energyCapacityAvailable>=450){
    				workerTemplate = worker450;
    				builderTemplate = worker400;
    				repairerTemplate = worker400;
    				upgraderTemplate = worker450;
    			}
    			
    			//6级可以调整为更高等级的upgrader模板，来减少单位数量
    			if(name=='E27S25'){
					upgraderTemplate = upgrader1600;
					upgraderCount = 2;
					wallRepairerCount = 1;
				}
				if(name=='E27S26'){
				    wallRepairerCount = 1;
				}
				if(name=='E28S26'){
				    upgraderTemplate = upgrader1150;
					builderCount = 2;
					wallRepairerCount = 1;
				}
				if(name=='E28S25'){
				    upgraderTemplate = upgrader1600;
				}
				if(name=='E29S24'){
				    upgraderTemplate = upgrader1600;
				    upgraderCount = 2;
					builderCount = 2;
					wallRepairerCount = 1;
				}
    			
    			const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.room==name);
    			const builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.memory.room==name);
    			const upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.memory.room==name);
    			const repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer' && creep.memory.room==name);
    	        
    	        //console.log(name+' upgraderCount now='+upgraders.length+' expected='+upgraderCount);
    	        
    			//复活用（因为能量会自动恢复到300）
    			if(harvesters.length==0 && builders.length==0 && upgraders.length==0 && repairers==0) {
    				const newName = 'Builder' + Game.time;
        	        vacantSpawn.spawnCreep(worker200, newName,
        	            {memory: {role: 'builder', room:name}});
        	        continue;
    	        }
    	        
    			if(builders.length < builderCount) {
    	        	const newName = 'Builder' + Game.time;
    	        	if(room.energyAvailable<400 && builders.length==0){
    	        	    builderTemplate = worker200;
    	        	}
    	        	else if(room.energyAvailable<800 && builders.length==0){
    	        	    builderTemplate = worker400;
    	        	}
    	            vacantSpawn.spawnCreep(builderTemplate, newName,
    	                {memory: {role: 'builder', room:name}});
    	            continue;
    	        }
    	        
    	    	if(harvesters.length < harvesterCount) {
    	    		let sourceId;
    	    		//控制器4级时，可以建造storage，且通过storage和container分别用一个采集者采集后放入容器，来避免其他单位采集能量点
    	    		//应该是没造好container之前不分配
    	    		//if(room.controller.level>=3){
    	    			for(let i=0;i<resources.length;i++){
    	    				let assignedResoureHarvester = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.room==name && creep.memory.sourceId == resources[i].id);
    	    				if(assignedResoureHarvester.length < harvesterCount/resources.length){
    	    					sourceId = resources[i].id;
    	    					break;
    	    				}
    	    			}
    	    		//}
    	    		const newName = 'Harvester' + Game.time;
    	    		if(sourceId){
    	    			vacantSpawn.spawnCreep(workerTemplate, newName,
    	    	                {memory: {role: 'harvester', room:name, sourceId:sourceId}});
    	    		}
    	    		else{
	    	            vacantSpawn.spawnCreep(workerTemplate, newName,
	    	                {memory: {role: 'harvester', room:name}});
    	    		}
    	    		continue;
    	        }

    	        if(upgraders.length < upgraderCount) {
    	        	const newName = 'Upgrader' + Game.time;
    	            vacantSpawn.spawnCreep(upgraderTemplate, newName,
    	                {memory: {role: 'upgrader', room:name}});
    	            continue;
    	        }
    	        if(repairers.length < repairCount) {
    	            const newName = 'Repairer' + Game.time;
    	            vacantSpawn.spawnCreep(repairerTemplate, newName,
    	                {memory: {role: 'repairer', room:name}});
    	            continue;
    	        }
    	        
    	        if(extracterCount >0 && extracterCount>_.filter(Game.creeps, (creep) => creep.memory.role == 'extracter' && creep.memory.room==name)){
    	        	const newName = 'Extracter' + Game.time;
    	            vacantSpawn.spawnCreep(extracter650, newName,
    	                {memory: {role: 'extracter', room:name}});
    	            continue;
    	        }
    	        
    	        if(wallRepairerCount >0 && wallRepairerCount>_.filter(Game.creeps, (creep) => creep.memory.role == 'wallRepairer' && creep.memory.room==name)){
    	        	const newName = 'WallRepairer' + Game.time;
    	            vacantSpawn.spawnCreep(wallRepairerTemplate, newName,
    	                {memory: {role: 'wallRepairer', room:name}});
    	            continue;
    	        }
    	        
    	        //不知道有了多个room之后，这段代码会不会导致多个房间同时生产
    	        //如果有问题，就要记录到memory里
    	        for(let k=0;k<outsourcingSupports.length;k++){
    	        	let outsourcingSupport = outsourcingSupports[k];
    	        	//当目标房间受到敌人入侵时停止建造
    	        	if(Game.rooms[outsourcingSupport.room]&&Game.rooms[outsourcingSupport.room].memory.threatLevel!=undefined && Game.rooms[outsourcingSupport.room].memory.threatLevel>0){
    	        		continue;
    	        	}
    	        	if(room.energyCapacityAvailable<1300){
    	        	    continue;
    	        	}
    	        	if(outsourcingSupport && outsourcingSupport.creater!=name){
        				continue;
        			}
    	        	
    	        	if(outsourcingSupport && outsourcingSupport.builderCount>0 && outsourcingSupport.builderCount>_.filter(Game.creeps, (creep) => creep.memory.targetRole == 'builder' && creep.memory.target==outsourcingSupport.room).length){
        	        	if(OK == vacantSpawn.spawnCreep(builder800,'OutsourcingBuilder'+Game.time,{ memory: { role:'outsourcing' ,targetRole: 'builder', target: outsourcingSupport.room, room:outsourcingSupport.room, targetObj:outsourcingSupport.targetObj, passThroughRoom:outsourcingSupport.passThroughRoom } } )){
        	        		outsourcingSupport.builderCount=outsourcingSupport.builderCount-1;
        	        	}
        	        	continue;
        	    	}
        	        if(outsourcingSupport && outsourcingSupport.upgraderCount>0 && outsourcingSupport.upgraderCount>_.filter(Game.creeps, (creep) => creep.memory.targetRole == 'upgrader' && creep.memory.target==outsourcingSupport.room).length){
        	        	if(OK == vacantSpawn.spawnCreep(upgrader1150,'OutsourcingUpgrader'+Game.time,{ memory: { role:'outsourcing' ,targetRole: 'upgrader', target: outsourcingSupport.room, room:outsourcingSupport.room, targetObj:outsourcingSupport.targetObj, passThroughRoom:outsourcingSupport.passThroughRoom } } )){
        	        		outsourcingSupport.upgraderCount=outsourcingSupport.upgraderCount-1;
        	        	}
        	        	continue;
        	    	}
        	        if(outsourcingSupport && outsourcingSupport.harvesterCount>0 && outsourcingSupport.harvesterCount>_.filter(Game.creeps, (creep) => creep.memory.targetRole == 'harvester' && creep.memory.target==outsourcingSupport.room).length){
        	        	if(OK == vacantSpawn.spawnCreep(worker1000,'OutsourcingHarvester'+Game.time,{ memory: { role:'outsourcing' ,targetRole: 'harvester', target: outsourcingSupport.room, room:outsourcingSupport.room, targetObj:outsourcingSupport.targetObj, passThroughRoom:outsourcingSupport.passThroughRoom } } )){
        	        		outsourcingSupport.harvesterCount=outsourcingSupport.harvesterCount-1;
        	        	}
        	        	continue;
        	    	}
        	        if(outsourcingSupport && outsourcingSupport.repairCount>0 && outsourcingSupport.repairCount>_.filter(Game.creeps, (creep) => creep.memory.targetRole == 'repairer' && creep.memory.target==outsourcingSupport.room).length){
        	        	if(OK == vacantSpawn.spawnCreep(builder800,'OutsourcingRepairer'+Game.time,{ memory: { role:'outsourcing' ,targetRole: 'repairer', target: outsourcingSupport.room, room:outsourcingSupport.room, targetObj:outsourcingSupport.targetObj, passThroughRoom:outsourcingSupport.passThroughRoom } } )){
        	        		outsourcingSupport.repairCount=outsourcingSupport.repairCount-1;
        	        	}
        	        	continue;
        	    	}
        	        if(outsourcingSupport && outsourcingSupport.reserveHarvesterCount>0 && outsourcingSupport.reserveHarvesterCount>_.filter(Game.creeps, (creep) => creep.memory.targetRole == 'reserveHarvester' && creep.memory.target==outsourcingSupport.room).length){
        	        	if(OK == vacantSpawn.spawnCreep(worker1300,'OutsourcingReserveHarvester'+Game.time,{ memory: { role:'outsourcing' ,targetRole: 'reserveHarvester', target: outsourcingSupport.room, room:outsourcingSupport.room, targetObj:outsourcingSupport.targetObj, passThroughRoom:outsourcingSupport.passThroughRoom } } )){
        	        		outsourcingSupport.reserveHarvesterCount=outsourcingSupport.reserveHarvesterCount-1;
        	        	}
        	        	continue;
        	    	}
    	        }
    	        
    	        if(carriers.length>0){
    	        	const currentCarriers = _.filter(Game.creeps, (creep) => creep.memory.role == 'carrier');
    	        	if(carriers.length>currentCarriers.length){
    	        		for(let i=0;i<carriers.length;i++){
    	        			const carrier = carriers[i];
    	        			if(carrier.creater!=name){
    	        				continue;
    	        			}
    	        			let isExisted = false;
    	        			for(let j=0;j<currentCarriers.length;j++){
    	        				const currentCarrier = currentCarriers[j];
    	        				if(currentCarrier.memory.routeId == carrier.routeId){
    	        					isExisted = true;
    	        					break;
    	        				}
    	        			}
    	        			if(!isExisted){
    	        				//当进攻的reserve房间受到敌人入侵时停止建造
    	        				let isDanger = false;
    	        				if(carrier.dangerRooms!=undefined){
    	        					for(let d=0;d<carrier.dangerRooms.length;d++){
    	        						let dangerRoom = carrier.dangerRooms[d];
    	        						if(Game.rooms[dangerRoom] && Game.rooms[dangerRoom].memory.threatLevel!=undefined && Game.rooms[dangerRoom].memory.threatLevel>0){
        	        						isDanger = true;
        	        					}
    	        					}
    	        				}
    	        				if(!isDanger){
    	        					vacantSpawn.spawnCreep(carrier.template,'Carrier'+Game.time,{ memory: { role: 'carrier', transportList: carrier.transportList,routeId: carrier.routeId} } );
    	        					continue;
    	        				}
        	        			
    	        			}
    	        		}
    	        	}
    	        }
    	        
    	        if(claimers.length>0){
    	        	const currentClaimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');
    	        	if(claimers.length> currentClaimers.length){
    	        		for(let i=0;i<claimers.length;i++){
    	        			const claimer = claimers[i];
    	        			if(claimer.creater!=name){
    	        				continue;
    	        			}
    	        			let isExisted = false;
    	        			for(let j=0;j<currentClaimers.length;j++){
    	        				const currentClaimer = currentClaimers[j];
    	        				if(currentClaimer.memory.target == claimer.target){
    	        					isExisted = true;
    	        					break;
    	        				}
    	        			}
    	        			if(!isExisted){
    	        				const target = claimer.target;
    	        				//当目标房间受到敌人入侵时停止建造
    	        	        	if(!(Game.rooms[target] && Game.rooms[target].memory.threatLevel!=undefined && Game.rooms[target].memory.threatLevel>0)){
    	        	        		if(!Game.rooms[target] || !Game.rooms[target].controller.reservation  || Game.rooms[target].controller.reservation.ticksToEnd<3000){
            	        				vacantSpawn.spawnCreep( claimer.template,'Claimer'+Game.time,{ memory: { role: 'claimer', target: claimer.target,oper:claimer.oper, passThroughRoom:claimer.passThroughRoom,targetObj: claimer.targetObj } } );
            	        				continue;
            	        			}
    	        	        	}
        	        			
    	        			}
        	        	}
    	        	}
    	        }
    		}
    	}
    }
};

module.exports = autoCreateCreeps;
