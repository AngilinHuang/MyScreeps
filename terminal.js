/**
 * terminal
 * 
 * Game.rooms['E28S25'].terminal.send(RESOURCE_KEANIUM, 2400, 'E28S26');
 * Game.rooms['E27S25'].terminal.send(RESOURCE_OXYGEN, 10000, 'E28S26');
 * Game.rooms['E27S26'].terminal.send(RESOURCE_LEMERGIUM, 14800, 'E29S24');
 * 
 * 
 * Game.rooms['E29S24'].terminal.send(RESOURCE_UTRIUM_LEMERGITE, 10000, 'E28S26');
 * 
 * 能量消耗计算方法
 * Game.market.calcTransactionCost(amount, roomName1, roomName2)
 * Game.market.calcTransactionCost(1000, 'E27S26', 'E28S26')		33
 * Game.market.calcTransactionCost(1000, 'E27S25', 'E28S26')	斜角和相邻一样	33
 * Game.market.calcTransactionCost(1000, 'E29S24', 'E28S26')		65
 * 
 */
var terminal = {
    run: function(structureTerminal) {
    	
    }
};

module.exports = terminal;
