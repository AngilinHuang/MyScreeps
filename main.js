var roleHarvester = require('harvester');
var roleUpgrader = require('upgrader');
var roleBuilder = require('builder');
var structureTower = require('tower');
var autoCreateCreeps = require('autoCreateCreeps');
var roleRepairer = require('repairer');

module.exports.loop = function () {

	//clear memory
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    // for(var name in Game.rooms) {Game.rooms[name].energyAvailable}  检查每个房间的可用能量
    
    //structure工作
    for(var name in Game.structures) {
        var structure = Game.structures[name];
        if(structure.structureType == STRUCTURE_TOWER) {
        	structureTower.run(structure);
        }
    }

    
    //自动生产harvester
    autoCreateCreeps.create();
    

    //给各个creep分配工作
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
    }
}