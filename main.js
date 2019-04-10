var roleHarvester = require('harvester');
var roleUpgrader = require('upgrader');
var roleBuilder = require('builder');
var structureTower = require('tower');
var autoCreateCreeps = require('autoCreateCreeps');
var roleRepairer = require('repairer');
var structureLink = require('link');

module.exports.loop = function () {

	//clear memory
    for(let name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }
    
    //structure工作
    for(let name in Game.structures) {
    	let structure = Game.structures[name];
        if(structure.structureType == STRUCTURE_TOWER) {
        	structureTower.run(structure);
        }
        else if(structure.structureType == STRUCTURE_LINK){
        	structureLink.run(structure);
        }
    }
    
    //自动生产creep工人
    autoCreateCreeps.create();
    

    //给各个creep分配工作
    for(let name in Game.creeps) {
    	let creep = Game.creeps[name];
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