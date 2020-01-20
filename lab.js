/**
 * lab
 * 
 * runReaction(lab1, lab2)
 * ERR_NOT_OWNER	-1	You are not the owner of this lab.
 * ERR_NOT_ENOUGH_RESOURCES	-6	The source lab do not have enough resources.
 * ERR_INVALID_TARGET	-7	The targets are not valid lab objects.
 * ERR_FULL	-8	The target cannot receive any more energy.
 * ERR_NOT_IN_RANGE	-9	The targets are too far away.
 * ERR_INVALID_ARGS	-10	The reaction cannot be run using this resources.
 * ERR_TIRED	-11	The lab is still cooling down.
 * ERR_RCL_NOT_ENOUGH	-14	Room Controller Level insufficient to use this structure.
 * 
 * boostCreep(creep, [bodyPartsCount])
 * 
 * 
 */
var lab = {
    run: function(structureLab, structureLab1, structureLab2) {
    	if(structureLab.cooldown){
    		return;
    	}
    	if(structureLab1.mineralAmount==0||structureLab2.mineralAmount==0){
    		return;
    	}
    	if(structureLab.mineralCapacity-5<structureLab.mineralAmount){
    		return;
    	}
    	const returnValue = structureLab.runReaction(structureLab1, structureLab2);
    	if(returnValue!=OK){
    	    console.log('lab run reaction error. labRoom='+structureLab.room.name+', labId='+structureLab.id+', returnValue='+returnValue);
    	}
    }
};

module.exports = lab;
