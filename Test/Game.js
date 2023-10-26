const canvas=document.getElementById('Test');
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width = 900;
const CANVAS_HEIGHT = canvas.height = 500;
let gameSpeed=2;

const DroneImage=new Image();
DroneImage.src='Forward.png';
const BoomImage=new Image();
BoomImage.src='boom.png';
let frame=0;
let gameFrame=0;
let x=0;
let canvasPosition=canvas.getBoundingClientRect();
let dronesPassed=0;
let score=0;
//console.log(canvasPosition);
//let canvasPosition=canvas.getBoundingClientRect();
const scoreValue=document.getElementById("showGameScore");


const backgroundImage=new Image();
backgroundImage.src='Overlay_illumination.png';
const landImage1=new Image();
landImage1.src='2.png';
const landImage2=new Image();
landImage2.src='3.png';
const landImage3=new Image();
landImage3.src='4.png';
const landImage4=new Image();
landImage4.src='5.png';

class Explosion{
    constructor(x,y){
        this.x=x;
        this.y=y;
        this.enemyWidth=200;
        this.enemyHeight=172;
        this.width=100;
        this.height=100;
        this.frame=0;
    }
    update(){
        if(gameFrame%10===0){
            this.frame++;
        }
    }
    draw(){
        ctx.drawImage(BoomImage,this.frame*this.enemyWidth,0,this.enemyWidth,this.enemyHeight,this.x,this.y,this.width,this.height);   
    }
}
//const explosion=new Explosion();
window.addEventListener('click', function (e) {
    console.log("Clciked");
    for (let i = 0; i < enemy1.length; i++) {
        if (isCollision(enemy1[i], e)) {
            BoomAnimation(e);
            enemy1[i].x = Math.random() * -110;
            enemy1[i].y = Math.random() * 400;
            score++;
            scoreValue.innerHTML = score;
        }
    }
});

function isCollision(rect, e) {
    let clickX = e.clientX - canvasPosition.left;
    let clickY = e.clientY - canvasPosition.top;
    return (
        clickX >= rect.x &&
        clickX <= rect.x + rect.width &&
        clickY >= rect.y &&
        clickY <= rect.y + rect.height
    );
}
// window.addEventListener('mousemove',function(e){
//     BoomAnimation(e);
// });

function BoomAnimation(e){
    let positionX=e.x-canvasPosition.left-50;
    let positionY=e.y-canvasPosition.top-50;
    //console.log(positionX,positionY);
    //console.log(canvasPosition.left,canvasPosition.top);
    explosions.push(new Explosion(positionX,positionY));
    //console.log("Boom");
}

class Background{
    constructor(){
        this.x=0;
        this.y=0;
        this.backWidth=576;
        this.backHeight=324;
        this.width=900;
        this.height=500;
    }
    draw(){
        ctx.drawImage(backgroundImage,this.x,this.y,this.backWidth,this.backHeight,this.x,this.y,this.width,this.height);
        ctx.drawImage(landImage1,this.x,this.y,this.backWidth,this.backHeight,this.x,this.y,this.width,this.height);
        ctx.drawImage(landImage2,this.x,this.y,this.backWidth,this.backHeight,this.x,this.y,this.width,this.height);
        ctx.drawImage(landImage3,this.x,this.y,this.backWidth,this.backHeight,this.x,this.y,this.width,this.height); 
        ctx.drawImage(landImage4,this.x,this.y,this.backWidth,this.backHeight,this.x,this.y,this.width,this.height);   
    }
}
class Enemy1{
    constructor(){
        this.x=Math.random()*-110;
        this.y=Math.random()*400;
        this.enemyWidth=48;
        this.enemyHeight=30;
        this.height=70;
        this.width=100;
        this.frame=0;
    }
    update(){
        this.x=this.x+3;//gameSpeed;
        if(this.x>CANVAS_WIDTH){
            this.x=Math.random()*-110;
            this.y=Math.random()*400;
            dronesPassed++;
            console.log("drone:",dronesPassed);
            if(dronesPassed>=4){
                showOver.innerHTML="GAME OVER";
                gameOver();
            }
        }
        if(gameFrame%10===0){
            this.frame++;
            if(this.frame===4){
                this.frame=0;
            }
        }
    }
    draw(){
        //ctx.fillRect(this.x,this.y,this.width,this.height)
        ctx.drawImage(DroneImage,this.frame*this.enemyWidth,10,this.enemyWidth,this.enemyHeight,this.x,this.y,this.width,this.height);
    }
}
const background=new Background(backgroundImage);
const drone1=new Enemy1();
const drone2=new Enemy1();
const drone3=new Enemy1();
const drone4=new Enemy1();
const enemy1=[drone1,drone2,drone3,drone4];
const explosions=[];
function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    background.draw();
    enemy1.forEach(Object =>{
        Object.update();
        Object.draw();
    });
    gameFrame++;
    for(let i=0;i<explosions.length;i++){
        explosions[i].update();
        explosions[i].draw();
        if(explosions[i].frame>5){
            explosions.splice(i,1);
            i--;
        }
    }
    gameSpeed+=0.000;
    requestAnimationFrame(animate);
}
animate();
const showOver=document.getElementById("gameOver");
function gameOver(){
    gameFrame = 0;
    enemy1 = [new Enemy1(), new Enemy1(), new Enemy1(), new Enemy1()];
    explosions.length = 0; 
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    background.draw();
    requestAnimationFrame(animate);
    
}