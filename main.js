var canvas1;
var canvas2;
var ctx1;
var ctx2;
var num;

var lastTime;
var deltaTime;

var canWidth;
var canHeight;

var bgPic=new Image();

var ane;
var fruit;
var bigFish;
var smallFish;
var smallFishTail=[];
var smallFishEye=[];
var smallFishBody=[];
var wave;

var bigFishTail=[];

var bigFishBodyBlue=[];
var bigFishBodyOrange=[];
var bigFishEye=[];
var halo;

var dust;
var dustPic=[];


var mx;
var my;

var data;


document.body.onload=game;


function game(){
    init();

    lastTime=Date.now();

    deltaTime=0;

    gameLoop();


}

function init(){
    canvas1=document.getElementById('canvas1');
    canvas2=document.getElementById('canvas2');

    ctx1=canvas1.getContext('2d');
    ctx2=canvas2.getContext('2d');

    canWidth=canvas2.width;
    canHeight=canvas2.height;

    canvas1.addEventListener('mousemove',onMouseMove,false);

    bgPic.src="./img/background.jpg";

    ane=new aneObj();
    ane.init();

    fruit=new fruitObj();
    fruit.init();

    bigFish=new bigFishObj();
    bigFish.init();

    smallFish=new smallFishObj();
    smallFish.init();

    for(var i=0;i<8;i++){
        smallFishTail[i]=new Image();
        smallFishTail[i].src="./img/babyTail"+i+".png";
    }

    for(var i=0;i<2;i++){
        smallFishEye[i]=new Image();
        smallFishEye[i].src="./img/babyEye"+i+".png";
    }

    for(var i=0;i<20;i++){
        smallFishBody[i]=new Image();
        smallFishBody[i].src="./img/babyFade"+i+".png";
    }

    for(var i=0;i<8;i++){
        bigFishTail[i]=new Image();
        bigFishTail[i].src="./img/bigTail"+i+".png";
    }

    for(var i=0;i<2;i++){
        bigFishEye[i]=new Image();
        bigFishEye[i].src="./img/bigEye"+i+".png";
    }

    for(var i=0;i<8;i++){
        bigFishBodyBlue[i]=new Image();
        bigFishBodyOrange[i]=new Image();
        bigFishBodyBlue[i].src="./img/bigSwimBlue"+i+".png";
        bigFishBodyOrange[i].src="./img/bigSwim"+i+".png";
    }
    ctx1.fillStyle="white";
    ctx1.font="20px Verdana";

    data=new dataObj();

    wave=new waveObj();
    wave.init();

    halo=new haloObj();
    halo.init();

    for(var i=0;i<7;i++){
        dustPic[i]=new Image();
        dustPic[i].src="./img/dust"+i+".png";
    }

    dust=new dustObj();
    dust.init();

    mx=canWidth*0.5;
    my=canHeight*0.5;
}


function gameLoop(){
    window.requestAnimationFrame(gameLoop);//根据机器性能计算帧数
    var now=Date.now();
    deltaTime=now-lastTime;
    lastTime=now;
    if(deltaTime>40){
        deltaTime=40;
    }
    drawBackground();
    ane.draw();
    fruitMonitor();
    fruit.draw();
    ctx1.clearRect(0,0,canWidth,canHeight);
    smallFish.draw();
    bigFish.draw();


    collideTest();
    smallBigCollide();
    data.draw();
    wave.draw();
    halo.draw();
    dust.draw();

}


function onMouseMove(e){
    if(!data.gameOver){
        if(e.offsetX||e.layerX)
        {
            mx=e.offsetX==undefined?e.layerX:e.offsetX;
            my=e.offsetY==undefined?e.layerY:e.offsetY;
        }
    }


}