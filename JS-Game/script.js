const canvas=document.getElementById('canvas1');
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const coolisionCanvas=document.getElementById('collisionCanvas');
const collisionCTX = collisionCanvas.getContext("2d");
collisionCanvas.width = window.innerWidth;
collisionCanvas.height = window.innerHeight;


//score
let score=0;
let gameOver=false;
let dronesPassed=0;
ctx.font='50px Impact';

//Drones
let drones=[];
let timeToNextDrone=0;
let droneInterval=500;
let lastTime=0;
class Drones{
    constructor(){
        this.droneWidth=48;
        this.droneHeight=48;
        this.sizeModifier=Math.random()*0.6+0.4;
        this.width=110*this.sizeModifier;
        this.height=110*this.sizeModifier;
        this.frame=0;
        this.maxFrame=2;
        this.x=canvas.width;
        this.y=Math.random()*(canvas.height-this.height);
        this.directionX=Math.random()*5+3;
        this.directionY=Math.random()*5-2.5;
        this.markedForDeletion=false;
        this.image=new Image();
        this.image.src='Forward.png';
        this.timeSinceFlap=0;
        this.flapInterval=Math.random()*50+150;
        this.randomColors=[Math.floor(Math.random()*255), Math.floor(Math.random()*255), Math.floor(Math.random()*255)];
        this.color='rgb('+this.randomColors[0]+','+this.randomColors[1]+','+this.randomColors[2]+')';
    }
    update(deltaTime){
        if(this.y<0||this.y>canvas.height-this.height){
            this.directionY=this.directionY*-1;
        }
        this.x-=this.directionX;
        this.y+=this.directionY;
        if(this.x<0-this.width) this.markedForDeletion=true;
        this.timeSinceFlap+=deltaTime;
        if(this.timeSinceFlap>this.flapInterval){
            if(this.frame>this.maxFrame) this.frame=0;
            else this.frame++;
            this.timeSinceFlap=0;
        }
        if(this.x<0-this.width){
            dronesPassed+=1;
            if(dronesPassed===10){
                gameOver=true;
            }
        }
    }
    draw(){
        collisionCTX.fillStyle=this.color;
        collisionCTX.fillRect(this.x,this.y,this.width,this.height);
        ctx.drawImage(this.image,this.frame*this.droneWidth,0,this.droneWidth,this.droneHeight,this.x,this.y,this.width,this.height);
    }
}

//Explosion
let explosions=[];
class Explosion{
    constructor(x,y,size){
        this.image=new Image();
        this.image.src='boom.png';
        this.boomWidth=200;
        this.boomHeight=179;
        this.size=size;
        this.x=x;
        this.y=y;
        this.frame=0;
        this.sound=new Audio();
        this.sound.src='bang_03.ogg';
        this.timeSinceLastFrame=0;
        this.frameInterval=200;
        this.markedForDeletion=false;
    }
    update(deltaTime){
        if(this.frame===0)this.sound.play();
        this.timeSinceLastFrame+=deltaTime;
        if(this.timeSinceLastFrame>this.frameInterval){
            this.frame++;
            this.timeSinceLastFrame=0;
            if(this.frame>5)this.markedForDeletion=true;
        }
    }
    draw(){
        ctx.drawImage(this.image,this.frame*this.boomWidth,0,this.boomWidth,this.boomHeight,this.x,this.y,this.size,this.size);
    }
}

class Background{
    constructor(){
        this.x=0;
        this.y=0;
        this.backWidth=576;
        this.backHeight=324;
        this.width=canvas.width;
        this.height=canvas.height;
        this.backgroundImage=new Image();
        this.backgroundImage.src='Overlay_illumination.png';
        this.landImage1=new Image();
        this.landImage1.src='2.png';
        this.landImage2=new Image();
        this.landImage2.src='3.png';
        this.landImage3=new Image();
        this.landImage3.src='4.png';
        this.landImage4=new Image();
        this.landImage4.src='5.png';
        this.gunImage=new Image();
        this.gunImage.src='big_gun.png';
    }
    draw(){
        ctx.drawImage(this.backgroundImage,this.x,this.y,this.backWidth,this.backHeight,this.x,this.y,this.width,this.height);
        ctx.drawImage(this.landImage1,this.x,this.y,this.backWidth,this.backHeight,this.x,this.y,this.width,this.height);
        ctx.drawImage(this.landImage2,this.x,this.y,this.backWidth,this.backHeight,this.x,this.y,this.width,this.height);
        ctx.drawImage(this.landImage3,this.x,this.y,this.backWidth,this.backHeight,this.x,this.y,this.width,this.height); 
        ctx.drawImage(this.landImage4,this.x,this.y,this.backWidth,this.backHeight,this.x,this.y,this.width,this.height); 
        ctx.drawImage(this.gunImage,0,0,52,66,canvas.width/2,500,100,200);  
    }
}


//ScoreFunction
function drawScore(){
    ctx.fillStyle='black';
    ctx.fillText('Score:'+score,50,75);
    ctx.fillStyle='white';
    ctx.fillText('Score:'+score,55,80);
}
//GameOverFunction
function drawGameOver(){
    ctx.textAlign='center';
    ctx.fillStyle='black';
    ctx.fillText('Game Over Score:'+score,canvas.width/2,canvas.height/2);
    ctx.fillStyle='white';
    ctx.fillText('Game Over Score:'+score,canvas.width/2+5,canvas.height/2+5);
}


//Click Event
window.addEventListener('click',function(e){
    const detectPixelColor=collisionCTX.getImageData(e.x,e.y,1,1);
    console.log(detectPixelColor);
    const pc=detectPixelColor.data;
    drones.forEach(object=>{
        if(object.randomColors[0]===pc[0]&&object.randomColors[1]===pc[1]&&object.randomColors[2]===pc[2]){
            object.markedForDeletion=true;
            score++;
            explosions.push(new Explosion(object.x,object.y,object.width));
        }
    })
})

const background=new Background();
//Animation Function
function animate(timestamp){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    collisionCTX.clearRect(0,0,canvas.width,canvas.height);
    //background.draw();
    let deltaTime=timestamp-lastTime;
    lastTime=timestamp;
    timeToNextDrone+=deltaTime;
    if(timeToNextDrone>droneInterval){
        drones.push(new Drones());
        timeToNextDrone=0;
        drones.sort(function(a,b){
            return a.width-b.width;
        });
    }
    background.draw();
    drawScore();
    [...drones,...explosions].forEach(object=>object.update(deltaTime));
    [...drones,...explosions].forEach(object=>object.draw());
    drones=drones.filter(object=>!object.markedForDeletion);
    explosions=explosions.filter(object=>!object.markedForDeletion);
    //console.log(drones);
    if(!gameOver)requestAnimationFrame(animate);
    else drawGameOver();
}
animate(0);