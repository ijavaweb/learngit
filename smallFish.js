var smallFishObj=function(){
    this.x;
    this.y;
    this.angle;

    this.smallFishTimer=0;
    this.smallFishCount=0;

    this.smallFishEyeTimer=0;
    this.smallFishEyeCount=0;
    this.smallFishEyeInterval=1000;

    this.smallFishBodyTimer=0;
    this.smallFishBodyCount=0;

};


smallFishObj.prototype.init=function(){
    this.x=canWidth*0.5-50;
    this.y=canHeight*0.5+50;
    this.angle=0;

};

smallFishObj.prototype.draw=function(){
    this.x=lerpDistance(bigFish.x,this.x,0.98);
    this.y=lerpDistance(bigFish.y,this.y,0.98);
//跟随大鱼
    var deltaX=bigFish.x-this.x;
    var deltaY=bigFish.y-this.y;
    var beta=Math.atan2(deltaY,deltaX)+Math.PI;
    this.angle=lerpAngle(beta,this.angle,0.6);
//尾巴摇摆
    this.smallFishTimer+=deltaTime;
    if(this.smallFishTimer>50){
        this.smallFishCount=(this.smallFishCount+1)%8;
        this.smallFishTimer%=50;
    }
//眨眼睛
    this.smallFishEyeTimer+=deltaTime;
    if(this.smallFishEyeTimer>this.smallFishEyeInterval){
        this.smallFishEyeCount=(this.smallFishEyeCount+1)%2;
        this.smallFishEyeTimer%=this.smallFishEyeInterval;
        if(this.smallFishEyeCount==0){
            this.smallFishEyeInterval=Math.random()*1500+2000;
        }else{
            this.smallFishEyeInterval=200;
        }
    }

    //画身体
    this.smallFishBodyTimer+=deltaTime;
    if(this.smallFishBodyTimer>300){
        this.smallFishBodyCount=this.smallFishBodyCount+1;
        this.smallFishBodyTimer%=300;
        if(this.smallFishBodyCount>19){
            this.smallFishBodyCount=19;
            data.gameOver=true;
        }

    }



    ctx1.save();

    ctx1.translate(this.x,this.y);
    ctx1.rotate(this.angle);

    var smallFishCount=this.smallFishCount;
    ctx1.drawImage(smallFishTail[smallFishCount],-smallFishTail[smallFishCount].width*0.5+23,-smallFishTail[smallFishCount].height*0.5);

   var smallFishBodyCount=this.smallFishBodyCount;
    ctx1.drawImage(smallFishBody[smallFishBodyCount],-smallFishBody[smallFishBodyCount].width*0.5,-smallFishBody[smallFishBodyCount].height*0.5);

    var smallFishEyeCount=this.smallFishEyeCount;
    ctx1.drawImage(smallFishEye[smallFishEyeCount],-smallFishEye[smallFishEyeCount].width*0.5,-smallFishEye[smallFishEyeCount].height*0.5);

    ctx1.restore();

};
