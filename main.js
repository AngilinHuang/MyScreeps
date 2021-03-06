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
var roleReserveHarvester = require('reserveHarvester');
var roleMeleeAttacker = require('meleeAttacker');
var roleRangedAttacker = require('rangedAttacker');
var roleExtracter = require('extracter');
var roleUnraveler = require('unraveler');
var roleHydra = require('hydra');
var roleBehemoth = require('behemoth');
var roleWarCharger = require('warCharger');
var roleWallRepairer = require('wallRepairer');

module.exports.loop = function () {

	//clear memory
    for(let name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }
    
    if(Game.cpu.bucket<9500){
        console.log('cpu limit access. bucket='+Game.cpu.bucket);
    }
    
    //room管理
    for(let roomName in Game.rooms){
		const room = Game.rooms[roomName];
		//威胁系数，防御用，计算有多少敌对creep持续入侵该房间
		const threatLevel = room.find(FIND_HOSTILE_CREEPS).length;
		if(threatLevel==0){
			room.memory.threatLevel = 0;
		}
		else{
			console.log(roomName+' is under attack. enemy count='+threatLevel)
			room.memory.threatLevel = threatLevel;
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
    	const role = creep.memory.role;
        if(role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        if(role == 'claimer') {
        	roleClaimer.run(creep);
        }
        if(role == 'carrier') {
        	roleCarrier.run(creep);
        }
        if(role == 'outsourcing') {
        	roleOutsourcing.run(creep);
        }
        if(role == 'reserveHarvester') {
        	roleReserveHarvester.run(creep);
        }
        if(role == 'meleeAttacker') {
        	roleMeleeAttacker.run(creep);
        }
        if(role == 'rangedAttacker') {
        	roleRangedAttacker.run(creep);
        }
        if(role == 'extracter') {
        	roleExtracter.run(creep);
        }
        if(role == 'unraveler') {
        	roleUnraveler.run(creep);
        }
        if(role == 'hydra') {
        	roleHydra.run(creep);
        }
        if(role == 'behemoth') {
        	roleBehemoth.run(creep);
        }
        if(role == 'warCharger') {
        	roleWarCharger.run(creep);
        }
        if(role == 'wallRepairer') {
        	roleWallRepairer.run(creep);
        }
    }
}