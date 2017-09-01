var aneObj=function(){

    //摆动参数设置
    this.rootX=[];
    this.headX=[];
    this.headY=[];
    this.alpha=0;
    this.amp=[];



};

aneObj.prototype.num=50;

aneObj.prototype.init=function(){
    for(var i =0;i<this.num;i++){
        this.rootX[i]=i*16+Math.random()*20;
        this.headX[i]=this.rootX[i];
        this.headY[i]=canHeight-250+Math.random()*50;
        this.amp[i]=Math.random()*50+50;
    }

};
aneObj.prototype.draw=function(){
    this.alpha+=deltaTime*0.0008;
    var l=Math.sin(this.alpha);
    ctx2.save();
    ctx2.globalAlpha=0.6;
    ctx2.lineWidth=20;
    ctx2.lineCap="round";
    ctx2.strokeStyle="#3b154e";
    for(var i=0;i<this.num;i++){
        //beginPath ,moveTo,lineTo,stroke,strokeStyle,lineWidth,lineCap
        ctx2.beginPath();
        ctx2.moveTo(this.rootX[i],canHeight);

        this.headX[i]=this.rootX[i]+l*this.amp[i];
        ctx2.quadraticCurveTo(this.rootX[i],canHeight-100,this.headX[i],this.headY[i]);
        ctx2.stroke();
    }
     ctx2.restore();
};
