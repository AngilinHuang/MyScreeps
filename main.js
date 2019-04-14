var roleHarvester = require('harvester');
var roleUpgrader = require('upgrader');
var roleBuilder = require('builder');
var structureTower = require('tower');
var autoCreateCreeps = require('autoCreateCreeps');
var roleRepairer = require('repairer');
var structureLink = require('link');
var roleClaimer = require('claimer');
var roleCarrier = require('carrier');
var roleOutsourcing = require('outsourcing');

module.exports.loop = function () {

	//clear memory
    for(let name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }
    
    //room管理
    for(let roomName in Game.rooms){
		const room = Game.rooms[roomName];
		if(room.controller.my){
			//威胁系数，防御用，计算有多少敌对creep持续入侵该房间
			const threatLevel = room.find(FIND_HOSTILE_CREEPS).length;
			if(threatLevel==0 || !room.memory.threatLevel){
				room.memory.threatLevel = threatLevel;
			}
			else{
				room.memory.threatLevel = room.memory.threatLevel + threatLevel;
			}
		}
    }
    
    //structure工作
    for(let name in Game.structures) {
    	const structure = Game.structures[name];
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
    	const creep = Game.creeps[name];
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
        if(creep.memory.role == 'claimer') {
        	roleClaimer.run(creep);
        }
        if(creep.memory.role == 'carrier') {
        	roleCarrier.run(creep);
        }
        if(creep.memory.role == 'outsourcing') {
        	roleOutsourcing.run(creep);
        }
    }
}