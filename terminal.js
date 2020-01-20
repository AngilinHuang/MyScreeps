/**
 * terminal
 * 
 * 原产地
 * Game.rooms['E28S25'].terminal.send(RESOURCE_KEANIUM, 2400, 'E28S26');
 * Game.rooms['E27S25'].terminal.send(RESOURCE_OXYGEN, 10000, 'E29S24');
 * Game.rooms['E27S25'].terminal.send(RESOURCE_OXYGEN, 10000, 'E28S25');
 * Game.rooms['E27S26'].terminal.send(RESOURCE_LEMERGIUM, 10000, 'E28S25');
 * Game.rooms['E27S26'].terminal.send(RESOURCE_LEMERGIUM, 10000, 'E27S25');
 * Game.rooms['E29S24'].terminal.send(RESOURCE_UTRIUM, 10000, 'E28S25');
 * Game.rooms['E28S26'].terminal.send('Z', 10000, 'E28S25');
 * Game.rooms['E32S26'].terminal.send('X', 10000, 'E27S25');
 * Game.rooms['E32S26'].terminal.send('X', 10000, 'E29S24');
 * Game.rooms['E26S28'].terminal.send('H', 20000, 'E29S24');
 * Game.rooms['E26S28'].terminal.send('H', 20000, 'E28S25');
 * 
 * E28S25需要OHZKUL
 * E27S25需要OH GO L X
 * E29S24需要H O X
 * 
 * 产出合成物
 * Game.rooms['E29S24'].terminal.send('XUH2O', 10000, 'E33S26');
 * Game.rooms['E28S25'].terminal.send("G", 5000, 'E33S26');
 * Game.rooms['E28S25'].terminal.send("OH",10000, 'E27S25');
 * Game.rooms['E27S25'].terminal.send('XLHO2', 10000, 'E32S26');
 * Game.rooms['E27S25'].terminal.send('XGHO2', 5000, 'E32S26');
 * 
 * 
 * 能量
 * Game.rooms['E29S24'].terminal.send(RESOURCE_ENERGY, 100000, 'E27S26');
 * 
 * GO
 * Game.rooms['E31S23'].terminal.send("GO", 4000, 'E27S25');
 * 
 * 
 * 能量消耗计算方法
 * Game.market.calcTransactionCost(amount, roomName1, roomName2)
 * Game.market.calcTransactionCost(1000, 'E27S26', 'E28S26')		33
 * Game.market.calcTransactionCost(1000, 'E27S25', 'E28S26')	斜角和相邻一样	33
 * Game.market.calcTransactionCost(1000, 'E29S24', 'E28S26')		65
 * 
 * 
 * 核弹已发射  14,29  核弹在大地图上并没有提示，小地图有红点和发射房间和倒计时，接近命中时间时会有红圈闪烁     正好可以看下rampart能否保护里面的建筑
 * 另一发核弹丢给离得近的房间   还有9万tickCD   也要准备好地面部队进攻		
 * 
 * 准备战斗员(work+attack+ranged)和healer的组合，也可以用来采集中央矿物
 * repairer受到攻击时别捡资源了，builder也是，以免去捡城墙能量时被打死--------
 * warcharger还是需要的，只允许给tower填能量
 * 增加一个指定tower随机开火功能
 * 打击对方reserve经济
 * builder为核弹填充G
 * 
 * 怎样为房间E27S26供应能量    E27S25的车到26的link		link标记为from
 * 
 * 
 * 目前对面的G供应不够，应该可以缓和一段时间
 * 

 * 
 * E29S24  lab XUH2O
 * {creater:'E29S24',routeId:32, template:carrier150, transportList: '5cd9e0ccfe8b2c7db076789c,0,U;5ce26bcff0dce278ea0151d7,1,U;5cd9e0ccfe8b2c7db076789c,1,U;5cd9e0ccfe8b2c7db076789c,0,H;5ce2b14206e2ac43368e2bdc,1,H;5cd9e0ccfe8b2c7db076789c,1,H;5cd9e0ccfe8b2c7db076789c,0,O;5ce300b271f98a5edbd48c90,1,O;5cd9e0ccfe8b2c7db076789c,1,O;5cd9e0ccfe8b2c7db076789c,0,X;5d015f177d46ca0f914f4efd,1,X;5cd9e0ccfe8b2c7db076789c,1,X;5cfa2e8632a30267751a7e2d,0,XUH2O;5cd9e0ccfe8b2c7db076789c,1,XUH2O;5cd9e0ccfe8b2c7db076789c,1,'+RESOURCE_ENERGY},
 * structureLab.run(Game.getObjectById('5cfa8b4f4e4dd8665f3614ae'),Game.getObjectById('5ce26bcff0dce278ea0151d7'),Game.getObjectById('5ce2b14206e2ac43368e2bdc'));
 * structureLab.run(Game.getObjectById('5cfadea11952b4429d18d99d'),Game.getObjectById('5ce300b271f98a5edbd48c90'),Game.getObjectById('5ce2b14206e2ac43368e2bdc'));
 * structureLab.run(Game.getObjectById('5cfe092afd2c0431c7d86006'),Game.getObjectById('5cfadea11952b4429d18d99d'),Game.getObjectById('5cfa8b4f4e4dd8665f3614ae'));
 * structureLab.run(Game.getObjectById('5cfa2e8632a30267751a7e2d'),Game.getObjectById('5d015f177d46ca0f914f4efd'),Game.getObjectById('5cfe092afd2c0431c7d86006'));
 * 
 * Game.rooms['E27S25'].terminal.send('O', 4036, 'E29S24');
 * Game.rooms['E32S26'].terminal.send('X', 10000, 'E29S24');
 * Game.rooms['E31S23'].terminal.send('H', 2500, 'E29S24');
 * 
 * 
 * E28S25   lab  G +OH
 * {creater:'E28S25',routeId:31, template:carrier150, transportList: '5cd95dfa4d273d453ff85f98,0,Z;5d02a43617b33153233932b6,1,Z;5cd95dfa4d273d453ff85f98,1,Z;5cd95dfa4d273d453ff85f98,0,K;5d03265f39a2533368bccaf8,1,K;5cd95dfa4d273d453ff85f98,1,K;5cd95dfa4d273d453ff85f98,0,U;5ce2f8c19e9ea759ca1bead4,1,U;5cd95dfa4d273d453ff85f98,1,U;5cd95dfa4d273d453ff85f98,0,L;5d02a61b986dd611128fa2dc,1,L;5cd95dfa4d273d453ff85f98,1,L;5d033cdc17877628a727c99c,0,G;5cd95dfa4d273d453ff85f98,1,G;5cd95dfa4d273d453ff85f98,1,'+RESOURCE_ENERGY},
 * structureLab.run(Game.getObjectById('5d02d6ec001e5f10d36f9d59'),Game.getObjectById('5d03265f39a2533368bccaf8'),Game.getObjectById('5d02a43617b33153233932b6'));
 * structureLab.run(Game.getObjectById('5d02dc13f25684287dda8b9d'),Game.getObjectById('5d02a61b986dd611128fa2dc'),Game.getObjectById('5ce2f8c19e9ea759ca1bead4'));
 * structureLab.run(Game.getObjectById('5d033cdc17877628a727c99c'),Game.getObjectById('5d02d6ec001e5f10d36f9d59'),Game.getObjectById('5d02dc13f25684287dda8b9d'));
 * 
 * Game.rooms['E27S26'].terminal.send('L', 20000, 'E28S25');
 * Game.rooms['E28S26'].terminal.send('Z', 20000, 'E28S25');
 * Game.rooms['E29S24'].terminal.send('U', 20000, 'E28S25');
 * Game.rooms['E27S25'].terminal.send('O', 10000, 'E28S25');
 * Game.rooms['E31S23'].terminal.send('H', 5000, 'E28S25');
 * 
 * Game.rooms['E29S24'].terminal.send('L', 20000, 'E28S25');
 * Game.rooms['E29S24'].terminal.send('L', 40000, 'E28S25');
 * 
 * 
 * E27S25   lab  XGHO2 + XLHO2
 * 
 * {creater:'E27S25',routeId:33, template:carrier450, transportList: '5cdb45dd1330c33d51912890,0,OH;5d01faad96340866362c26b9,1,OH;5cdb45dd1330c33d51912890,1,OH;5cdb45dd1330c33d51912890,0,GO;5d0352eddd53e031fcfd2c20,1,GO;5cdb45dd1330c33d51912890,1,GO;5cdb45dd1330c33d51912890,0,X;5d0305c0e4973731e23ab792,1,X;5cdb45dd1330c33d51912890,1,X;5cdb45dd1330c33d51912890,0,L;5d021bce21281831d9f15c5b,1,L;5cdb45dd1330c33d51912890,1,L;5cdb45dd1330c33d51912890,0,O;5d0305c0e4973731e23ab792,1,O;5cdb45dd1330c33d51912890,1,O;5d02c78d986dd611128fae40,0,XGHO2;5cdb45dd1330c33d51912890,1,XGHO2;5d015219412b366796b621e5,0,XLHO2;5cdb45dd1330c33d51912890,1,XLHO2;5cdb45dd1330c33d51912890,1,'+RESOURCE_ENERGY},
 * 5cdb45dd1330c33d51912890,0,OH;5d01faad96340866362c26b9,1,OH;5cdb45dd1330c33d51912890,1,OH;5cdb45dd1330c33d51912890,0,GO;5d0352eddd53e031fcfd2c20,1,GO;5cdb45dd1330c33d51912890,1,GO;5cdb45dd1330c33d51912890,0,X;5d0305c0e4973731e23ab792,1,X;5cdb45dd1330c33d51912890,1,X;5cdb45dd1330c33d51912890,0,L;5d021bce21281831d9f15c5b,1,L;5cdb45dd1330c33d51912890,1,L;5cdb45dd1330c33d51912890,0,O;5d024d91f7020f7e6812e1e2,1,O;5cdb45dd1330c33d51912890,1,O;5d02c78d986dd611128fae40,0,XGHO2;5cdb45dd1330c33d51912890,1,XGHO2;5d015219412b366796b621e5,0,XLHO2;5cdb45dd1330c33d51912890,1,XLHO2;
 * 
 * structureLab.run(Game.getObjectById('5d031f5e5b3e13339b852658'),Game.getObjectById('5d01faad96340866362c26b9'),Game.getObjectById('5d0352eddd53e031fcfd2c20'));
 * structureLab.run(Game.getObjectById('5d02c78d986dd611128fae40'),Game.getObjectById('5d031f5e5b3e13339b852658'),Game.getObjectById('5d0305c0e4973731e23ab792'));
 * structureLab.run(Game.getObjectById('5d018354b5a6e7319f555029'),Game.getObjectById('5d021bce21281831d9f15c5b'),Game.getObjectById('5d024d91f7020f7e6812e1e2'));
 * structureLab.run(Game.getObjectById('5ce2b76f9fe4da5efbcf2761'),Game.getObjectById('5d018354b5a6e7319f555029'),Game.getObjectById('5d01faad96340866362c26b9'));
 * structureLab.run(Game.getObjectById('5d015219412b366796b621e5'),Game.getObjectById('5ce2b76f9fe4da5efbcf2761'),Game.getObjectById('5d0305c0e4973731e23ab792'));
 * 
 * 
 * Game.rooms['E27S26'].terminal.send("GO", 1543, 'E27S25');
 * Game.rooms['E28S25'].terminal.send("OH", 6000, 'E27S25');
 * Game.rooms['E32S26'].terminal.send('X', 10000, 'E27S25');
 * 
 * 
 * 
 * UH OH X	近战		重要
 * KO OH X  远程
 * LO OH X	治疗		重要
 * ZH OH X	拆墙
 * ZO OH X  移动		重要
 * GO OH X	免伤		重要
 * 
 * 
 * 究极防御用
 * Game.rooms['E29S24'].terminal.send('XUH2O', 1000, 'E27S25');
 * 
 * {creater:'E27S25',routeId:91, template:carrier150, transportList: '5cdb45dd1330c33d51912890,0,XUH2O;5d01faad96340866362c26b9,1,XUH2O;5cdb45dd1330c33d51912890,1,XUH2O;5cdb45dd1330c33d51912890,1,'+RESOURCE_ENERGY},
 * Game.spawns['Spawn14'].spawnCreep( [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK],'Melee'+Game.time,{ memory: { role: 'meleeAttacker', target: 'E27S25'} });
 * Game.getObjectById('5d01faad96340866362c26b9').boostCreep(Game.getObjectById(''))
 * Game.getObjectById('').memory.target='E27S26'
 * Game.getObjectById('').memory.role='meleeAttacker'
 * 
 * 
 * 防御用
 * Game.spawns['Spawn4'].spawnCreep( [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK],'Melee'+Game.time,{ memory: { role: 'meleeAttacker', target: 'E27S26'} });
 * 
 * warcharger，尽量早点造
 * Game.spawns['Spawn13'].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'WarCharger'+Game.time,{memory: {role: 'warCharger', room:'E27S26'}});
 * 
 * 核弹发射
 * Game.getObjectById('5cf7488196340866362788ea').launchNuke(new RoomPosition(17,34, 'E26S27'));
 * 
 * 
 * 
 * 
 * 
 * 
 */
var terminal = {
    run: function(structureTerminal) {
    	
    }
};

module.exports = terminal;
