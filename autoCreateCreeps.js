var autoCreateCreeps = {
	
		
		
    create: function() {
    	
    	const defaultHarvesterCount = 2;
    	const defaultUpgraderCount = 2;
    	const defaultBuilderCount = 1;
    	const defaultRepairCount = 1;
    	
    	//使用outsourcing远程支持新占房间时，优先发送upgrader和builder，等到基建完成后再发送harvester
    	//也能支持远程reserve采矿
    	let outsourcingSupports = [{room:'W15S17',builderCount:0,upgraderCount:0,harvesterCount:0,repairCount:0,reserveHarvesterCount:1},
    				{room:'W14S17',builderCount:0,upgraderCount:0,harvesterCount:0,repairCount:0,reserveHarvesterCount:1, targetObj:'5bbcac1c9099fc012e634f48',passThroughRoom:'W15S17'}];
    	
    	const worker200 = [WORK,CARRY,MOVE];
    	const worker400 = [WORK,WORK,CARRY,CARRY,MOVE,MOVE];
    	const worker300 = [WORK,WORK,CARRY,MOVE];//init | 2tick on road | 3tick on plain | 15tick on swamp
    	const worker450 = [WORK,WORK,WORK,CARRY,MOVE,MOVE];//lv2 with 3 extension | 6energy/tick | 1tick on road | 2tick on plain | 10tick on swamp
    	const worker700 = [WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE];//lv3 with 8 extension | 10energy/tick| 1tick on road | 2tick on plain | 10tick on swamp
    	const builder650 = [WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE];
    	const upgrader800 = [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];//lv3 with 10 extension
    	const worker1000 = [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE];
    	const upgrader950 = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE];
    	const builder800 = [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
    	const upgrader1050 = [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE];
    	const carrier750 = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE];
    	const carrier900 = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
    	const carrier1050 = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
    	const carrier1200 = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
    	const carrier1650 = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
    	const claimer650 = [CLAIM,MOVE];
    	const claimer1300 = [CLAIM,MOVE,CLAIM,MOVE];
    	const meleeSmall = [TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK];
    	
    	//carrier列表
    	const carriers = [{room:'W15S18',dangerRooms:['W15S17'],routeId:1, template:carrier1650, transportList: '5cb1e66385230e4f50b25fe9,0,'+RESOURCE_ENERGY+';5cb21615a19b4a7d5c85073c,1,'+RESOURCE_ENERGY+';5cab85e10fe2d22e2511d281,1,'+RESOURCE_ENERGY},
    		{room:'W15S19',routeId:2, template:carrier900, transportList: '5cb0071ada070a2778f620a0,0,'+RESOURCE_ENERGY+';5cb1f50dd2382c205cbc7b58,1,'+RESOURCE_ENERGY+';5cb08bc98302927d5668682a,0,'+RESOURCE_ENERGY+';5cb1f50dd2382c205cbc7b58,1,'+RESOURCE_ENERGY},
    	{room:'W15S18',dangerRooms:['W15S17','W14S17'],routeId:3, template:carrier1650, transportList: '5cb2d28b92df111cb6edfa19,0,'+RESOURCE_ENERGY+';5cb21615a19b4a7d5c85073c,1,'+RESOURCE_ENERGY+';5cab85e10fe2d22e2511d281,1,'+RESOURCE_ENERGY},
    	{room:'W15S18',dangerRooms:['W15S17','W14S17'],routeId:4, template:carrier1050, transportList: '5cb2d28b92df111cb6edfa19,0,'+RESOURCE_ENERGY+';5cb21615a19b4a7d5c85073c,1,'+RESOURCE_ENERGY+';5cab85e10fe2d22e2511d281,1,'+RESOURCE_ENERGY}];
    	
    	//clamers列表，主要用于reserve
    	const claimers = [{template:claimer1300, target: 'W15S17', oper:'reserve' },
    		{template:claimer1300, target: 'W14S17', oper:'reserve' ,passThroughRoom:'W15S17'}];
   
    	if(_.filter(Game.creeps, (creep) => creep.memory.role == 'meleeAttacker').length<1){
            Game.spawns['Spawn1'].spawnCreep( meleeSmall,'Melee'+Game.time,{ memory: { role: 'meleeAttacker', target: 'W14S17', passThroughRoom: 'W15S17'} } );
        }
   
    	if(Game.rooms['W15S17']&&Game.rooms['W15S17'].memory.threatLevel>0
    			&& _.filter(Game.creeps, (creep) => creep.memory.role == 'meleeAttacker').length<2){
    		Game.spawns['Spawn1'].spawnCreep( meleeSmall,'Melee'+Game.time,{ memory: { role: 'meleeAttacker', target: 'W15S17'} } );
    	}
    	else if(Game.rooms['W14S17']&&Game.rooms['W14S17'].memory.threatLevel>0
    			&& _.filter(Game.creeps, (creep) => creep.memory.role == 'meleeAttacker').length<2){
    		Game.spawns['Spawn1'].spawnCreep( meleeSmall,'Melee'+Game.time,{ memory: { role: 'meleeAttacker', target: 'W14S17', passThroughRoom: 'W15S17'} } );
    	}
    	
    	
    	for(let name in Game.rooms){
    		const room = Game.rooms[name];
    		const spawns = room.find(FIND_MY_SPAWNS);
    		//console.log(name+' spawnsCount='+spawns.length);
    		if(spawns.length>0){
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
    			if(room.controller.level==1 || room.controller.level==2){
    				harvesterCount = 0;
    				upgraderCount = 0;
    				builderCount = 0;
    				repairCount = 0;
    			}
    			else if(room.controller.level==3 || room.controller.level==4){
    				harvesterCount = 2;
    				upgraderCount = 2;
    				builderCount = 1;
    				repairCount = 1;
    			}
    			else if(room.controller.level==6){
    				upgraderCount=3;
    			}
    			else if(room.controller.level==8){
    				upgraderCount = 0;
    			}
    			
    			//根据当前room储存的资源存储最大上限，计算工人模板
    			let workerTemplate = worker200;
    			let builderTemplate = worker200;
    			let repairerTemplate = worker200;
    			let upgraderTemplate = worker200;
    			
    			//5级满extension，且此时已经造好link了，upgrader牺牲移动换工作效率
    			if(room.energyCapacityAvailable>=1800){
    				workerTemplate = worker1000;
    				builderTemplate = builder800;
    				repairerTemplate = builder800;
    				upgraderTemplate = upgrader950;
    			}
    			//4级满extension
    			else if(room.energyCapacityAvailable>=1300){
    				workerTemplate = worker1000;
    				builderTemplate = builder800;
    				repairerTemplate = builder800;
    				upgraderTemplate = upgrader1050;
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
    			
    			const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.room==name);
    			const builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.memory.room==name);
    			const upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.memory.room==name);
    			const repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer' && creep.memory.room==name);
    	        
    	        //console.log(name+' upgraderCount now='+upgraders.length+' expected='+upgraderCount);
    	        
    	        
    			//复活用（因为能量会自动恢复到300）
    			if(harvesters.length==0 && builders.length==0 && upgraders.length==0 && repairers==0) {
    				if(room.storage && room.storage.store[RESOURCE_ENERGY]>3000){
    					const newName = 'Builder' + Game.time;
        	            spawns[0].spawnCreep(worker200, newName,
        	                {memory: {role: 'builder', room:name}});
        	            return;
    				}
    				else{
    					const newName = 'Harvester' + Game.time;
        	            spawns[0].spawnCreep(worker300, newName,
        	                {memory: {role: 'harvester', room:name}});
        	            return;
    				}
    	        }
    	    	else if(harvesters.length < harvesterCount) {
    	    		let sourceId;
    	    		//控制器4级时，可以建造storage，且通过storage和container分别用一个采集者采集后放入容器，来避免其他单位采集能量点
    	    		if(room.controller.level>=4){
    	    			for(let i=0;i<resources.length;i++){
    	    				let assignedResoureHarvester = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.room==name && creep.memory.sourceId == resources[i].id);
    	    				if(assignedResoureHarvester.length < harvesterCount/resources.length){
    	    					sourceId = resources[i].id;
    	    					break;
    	    				}
    	    			}
    	    		}
    	    		const newName = 'Harvester' + Game.time;
    	    		if(sourceId){
    	    			spawns[0].spawnCreep(workerTemplate, newName,
    	    	                {memory: {role: 'harvester', room:name, sourceId:sourceId}});
    	    		}
    	    		else{
	    	            spawns[0].spawnCreep(workerTemplate, newName,
	    	                {memory: {role: 'harvester', room:name}});
    	    		}
    	            return;
    	        }

    			if(builders.length < builderCount) {
    	        	const newName = 'Builder' + Game.time;
    	            spawns[0].spawnCreep(builderTemplate, newName,
    	                {memory: {role: 'builder', room:name}});
    	            return;
    	        }
    	        if(upgraders.length < upgraderCount) {
    	        	const newName = 'Upgrader' + Game.time;
    	            spawns[0].spawnCreep(upgraderTemplate, newName,
    	                {memory: {role: 'upgrader', room:name}});
    	            return;
    	        }
    	        if(repairers.length < repairCount) {
    	            const newName = 'Repairer' + Game.time;
    	            spawns[0].spawnCreep(repairerTemplate, newName,
    	                {memory: {role: 'repairer', room:name}});
    	            return;
    	        }
    	        
    	        if(carriers.length>0){
    	        	const currentCarriers = _.filter(Game.creeps, (creep) => creep.memory.role == 'carrier');
    	        	if(carriers.length>currentCarriers.length){
    	        		for(let i=0;i<carriers.length;i++){
    	        			const carrier = carriers[i];
    	        			if(carrier.room!=name){
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
    	        					spawns[0].spawnCreep(carrier.template,'Carrier'+Game.time,{ memory: { role: 'carrier', transportList: carrier.transportList,routeId: carrier.routeId} } );
                	    	        return;
    	        				}
        	        			
    	        			}
    	        		}
    	        	}
    	        }
    	        
    	        //不知道有了多个room之后，这段代码会不会导致多个房间同时生产
    	        //如果有问题，就要记录到memory里
    	        for(let k=0;k<outsourcingSupports.length;k++){
    	        	let outsourcingSupport = outsourcingSupports[k];
    	        	//当目标房间受到敌人入侵时停止建造
    	        	if(Game.rooms[outsourcingSupport.room]&&Game.rooms[outsourcingSupport.room].memory.threatLevel!=undefined && Game.rooms[outsourcingSupport.room].memory.threatLevel>0){
    	        		continue;
    	        	}
    	        	
    	        	if(outsourcingSupport && outsourcingSupport.builderCount>0 && outsourcingSupport.builderCount>_.filter(Game.creeps, (creep) => creep.memory.targetRole == 'builder' && creep.memory.target==outsourcingSupport.room).length){
        	        	outsourcingSupport.builderCount=outsourcingSupport.builderCount-1;
        	        	spawns[0].spawnCreep(builder800,'OutsourcingBuilder'+Game.time,{ memory: { role:'outsourcing' ,targetRole: 'builder', target: outsourcingSupport.room, room:outsourcingSupport.room, targetObj:outsourcingSupport.targetObj, passThroughRoom:outsourcingSupport.passThroughRoom } } );
        	        	return;
        	    	}
        	        if(outsourcingSupport && outsourcingSupport.upgraderCount>0 && outsourcingSupport.upgraderCount>_.filter(Game.creeps, (creep) => creep.memory.targetRole == 'upgrader' && creep.memory.target==outsourcingSupport.room).length){
        	        	outsourcingSupport.upgraderCount=outsourcingSupport.upgraderCount-1;
        	        	spawns[0].spawnCreep(builder800,'OutsourcingUpgrader'+Game.time,{ memory: { role:'outsourcing' ,targetRole: 'upgrader', target: outsourcingSupport.room, room:outsourcingSupport.room, targetObj:outsourcingSupport.targetObj, passThroughRoom:outsourcingSupport.passThroughRoom } } );
        	        	return;
        	    	}
        	        if(outsourcingSupport && outsourcingSupport.harvesterCount>0 && outsourcingSupport.harvesterCount>_.filter(Game.creeps, (creep) => creep.memory.targetRole == 'harvester' && creep.memory.target==outsourcingSupport.room).length){
        	        	outsourcingSupport.harvesterCount=outsourcingSupport.harvesterCount-1;
        	        	spawns[0].spawnCreep(worker1000,'OutsourcingHarvester'+Game.time,{ memory: { role:'outsourcing' ,targetRole: 'harvester', target: outsourcingSupport.room, room:outsourcingSupport.room, targetObj:outsourcingSupport.targetObj, passThroughRoom:outsourcingSupport.passThroughRoom } } );
        	        	return;
        	    	}
        	        if(outsourcingSupport && outsourcingSupport.repairCount>0 && outsourcingSupport.repairCount>_.filter(Game.creeps, (creep) => creep.memory.targetRole == 'repairer' && creep.memory.target==outsourcingSupport.room).length){
        	        	outsourcingSupport.repairCount=outsourcingSupport.repairCount-1;
        	        	spawns[0].spawnCreep(builder800,'OutsourcingRepairer'+Game.time,{ memory: { role:'outsourcing' ,targetRole: 'repairer', target: outsourcingSupport.room, room:outsourcingSupport.room, targetObj:outsourcingSupport.targetObj, passThroughRoom:outsourcingSupport.passThroughRoom } } );
        	        	return;
        	    	}
        	        if(outsourcingSupport && outsourcingSupport.reserveHarvesterCount>0 && outsourcingSupport.reserveHarvesterCount>_.filter(Game.creeps, (creep) => creep.memory.targetRole == 'reserveHarvester' && creep.memory.target==outsourcingSupport.room).length){
        	        	outsourcingSupport.reserveHarvesterCount=outsourcingSupport.reserveHarvesterCount-1;
        	        	spawns[0].spawnCreep(worker1000,'OutsourcingReserveHarvester'+Game.time,{ memory: { role:'outsourcing' ,targetRole: 'reserveHarvester', target: outsourcingSupport.room, room:outsourcingSupport.room, targetObj:outsourcingSupport.targetObj, passThroughRoom:outsourcingSupport.passThroughRoom } } );
        	        	return;
        	    	}
    	        }
    	        
    	        
    	        
    	        if(claimers.length>0){
    	        	const currentClaimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');
    	        	if(claimers.length> currentClaimers.length){
    	        		for(let i=0;i<claimers.length;i++){
    	        			const claimer = claimers[i];
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
    	        	        		if(!Game.rooms[target] || Game.rooms[target].controller.reservation.ticksToEnd<3000){
            	        				spawns[0].spawnCreep( claimer.template,'Claimer'+Game.time,{ memory: { role: 'claimer', target: claimer.target,oper:claimer.oper, passThroughRoom:claimer.passThroughRoom } } );
                	    	        	return;
            	        			}
    	        	        	}
        	        			
    	        			}
        	        	}
    	        	}
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
