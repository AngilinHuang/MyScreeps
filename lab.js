/**
 * lab
 * 
 * runReaction(lab1, lab2)
 * 
 * boostCreep(creep, [bodyPartsCount])
 * 
 * 
 * 
 * Game.getObjectById('5cda48e1d2f8774527a0c52c').runReaction(Game.getObjectById('5cd9e7f2194f287640c1afbf'),Game.getObjectById('5cd979d0194f287640c185c8'))
 * 
 * Z+K
 * {creater:'E28S26',routeId:21, template:carrier150, transportList: '5cd025e13a071f4bbccd384f,0,'+RESOURCE_ZYNTHIUM+';5cd979d0194f287640c185c8,1,'+RESOURCE_ZYNTHIUM+';5cd7d52b3a5de64622d0ed5c,1,'+RESOURCE_ZYNTHIUM+';5cd7d52b3a5de64622d0ed5c,0,'+RESOURCE_KEANIUM+';5cd9e7f2194f287640c1afbf,1,'+RESOURCE_KEANIUM+';5cd7d52b3a5de64622d0ed5c,1,'+RESOURCE_KEANIUM+';5cda48e1d2f8774527a0c52c,0,'+RESOURCE_ZYNTHIUM_KEANITE+';5cd7d52b3a5de64622d0ed5c,1,'+RESOURCE_ZYNTHIUM_KEANITE+';5cd7d52b3a5de64622d0ed5c,1,'+RESOURCE_ENERGY}
 * 清库
 * {creater:'E28S26',routeId:21, template:carrier150, transportList: '5cd979d0194f287640c185c8,0,'+RESOURCE_ZYNTHIUM+';5cd7d52b3a5de64622d0ed5c,1,'+RESOURCE_ZYNTHIUM+';5cd9e7f2194f287640c1afbf,0,'+RESOURCE_KEANIUM+';5cd7d52b3a5de64622d0ed5c,1,'+RESOURCE_KEANIUM+';5cda48e1d2f8774527a0c52c,0,'+RESOURCE_ZYNTHIUM_KEANITE+';5cd7d52b3a5de64622d0ed5c,1,'+RESOURCE_ZYNTHIUM_KEANITE}
 * 
 * U+L
 * {creater:'E29S24',routeId:22, template:carrier150, transportList: '5cd54e06c689c47656221b63,0,'+RESOURCE_UTRIUM+';5ce26bcff0dce278ea0151d7,1,'+RESOURCE_UTRIUM+';5cd9e0ccfe8b2c7db076789c,1,'+RESOURCE_UTRIUM+';5cd9e0ccfe8b2c7db076789c,0,'+RESOURCE_LEMERGIUM+';5ce300b271f98a5edbd48c90,1,'+RESOURCE_LEMERGIUM+';5cd9e0ccfe8b2c7db076789c,1,'+RESOURCE_LEMERGIUM+';5ce2b14206e2ac43368e2bdc,0,'+RESOURCE_UTRIUM_LEMERGITE+';5cd9e0ccfe8b2c7db076789c,1,'+RESOURCE_UTRIUM_LEMERGITE+';5cd9e0ccfe8b2c7db076789c,1,'+RESOURCE_ENERGY}
 * 清库
 * 
 */
var lab = {
    run: function(structureLab, structureLab1, structureLab2) {
    	structureLab.runReaction(structureLab1, structureLab2);
    }
};

module.exports = lab;
