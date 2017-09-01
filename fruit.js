var fruitObj=function(){
    this.alive=[];
    this.blue=new Image();
    this.orange=new Image();
    this.x=[];
    this.y=[];
    this.l=[];
    this.fruitType=[];
    this.speed=[];
    this.aneNumber=[];
};

fruitObj.prototype.num=30;


fruitObj.prototype.init=function(){

    for(var i=0;i<this.num;i++){
        this.alive[i]=false;
        this.x[i]=0;
        this.y[i]=0;
        this.l[i]=0;
        this.aneNumber[i]=0;
        this.fruitType[i]="";
        this.speed[i]=Math.random()*0.018+0.002;
        this.born(i);
    }
    this.orange.src="./img/fruit.png";
    this.blue.src="./img/blue.png";
};



fruitObj.prototype.draw=function(){

    for(var i=0;i<this.num;i++){
        if(this.alive[i]){
            if(this.fruitType[i]=="blue"){
                var pic=this.blue;
            }else{
                var pic=this.orange;
            }
            if(this.l[i]<=14) {
                var num=this.aneNumber[i];
                this.x[i]=ane.headX[num];
                this.y[i]=ane.headY[num];
                this.l[i]+=this.speed[i]*deltaTime;
                ctx2.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);

            }else{
                this.y[i]-=this.speed[i]*7*deltaTime;
                ctx2.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);

            }
            if(this.y[i]<10){
                this.alive[i]=false;
            }
        }
    }
};

fruitObj.prototype.born=function(i){
    this.aneNumber[i]=Math.floor(Math.random()*ane.num);

    this.l[i]=0;
    this.alive[i]=true;
    var ran=Math.random();
    if(ran<0.15){
        this.fruitType[i]="blue";
    }else{
        this.fruitType[i]="orange";
    }


};

fruitObj.prototype.dead=function(i){
    this.alive[i]=false;
}


/*fruitObj.prototype.update=function(){
    var num=0;
    for(var i =0;i<this.num;i++){
        if(this.alive[i]){
            num++;
        }
    }
};*/
//控制数量
function fruitMonitor(){
    var num=0;
    for(var i=0;i<fruit.num;i++){
        if(fruit.alive[i]){
            num++;
        }
    }
    if(num<15){
        sendFruit();
        return;
    }
}


function sendFruit(){
    for(var i=0;i<fruit.num;i++){
        if(!fruit.alive[i]){
            fruit.born(i);
            return;
        }
    }
}