#FAQ
##走到资源面前不采集  
必须调用creep的采集方法harvest。以示例代码为例，采集harvest方法必须接近到1格内才能生效，这段代码的意思是如果采集报错距离太远，就走近  
>if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
>    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
>}


##Room controller怎么用代码升级  
不需要编码， 当creep调用upgradeController时，如果能量超过了升级所需能量，会自动升级


##decay的影响，一些建筑每过一段时间后会掉血，需要避免做哪些事来减少维修代价  
不要在墙上修路，墙上修路的维护费等于平地的150倍，沼泽的30倍。




