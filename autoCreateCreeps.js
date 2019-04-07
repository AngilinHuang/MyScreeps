var autoCreateCreeps = {
	
		
		
    create: function() {
    	var harvesterCount = 2;
    	var upgraderCount = 1;
    	var builderCount = 2;
    	var repairCount = 0;
    	
    	var defaultWorker = [WORK,WORK,CARRY,MOVE];
    	var worker300 = [WORK,WORK,CARRY,MOVE];
    	var worker450 = [WORK,WORK,WORK,CARRY,MOVE,MOVE];
    	
    	
    	var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        if(harvesters.length < harvesterCount) {
            var newName = 'Harvester' + Game.time;
            Game.spawns['Spawn1'].spawnCreep(defaultWorker, newName,
                {memory: {role: 'harvester'}});
        }
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        if(builders.length < builderCount) {
            var newName = 'Builder' + Game.time;
            Game.spawns['Spawn1'].spawnCreep(defaultWorker, newName,
                {memory: {role: 'builder'}});
        }
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        if(upgraders.length < upgraderCount) {
            var newName = 'Upgrader' + Game.time;
            Game.spawns['Spawn1'].spawnCreep(defaultWorker, newName,
                {memory: {role: 'upgrader'}});
        }
        var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
        if(repairers.length < repairCount) {
            var newName = 'Repairer' + Game.time;
            Game.spawns['Spawn1'].spawnCreep(defaultWorker, newName,
                {memory: {role: 'repairer'}});
        }
        
        if(Game.spawns['Spawn1'].spawning) {
            var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
            Game.spawns['Spawn1'].room.visual.text(
                spawningCreep.memory.role,
                Game.spawns['Spawn1'].pos.x + 1,
                Game.spawns['Spawn1'].pos.y,
                {align: 'left', opacity: 0.8});
        }
    }
};

module.exports = autoCreateCreeps;
