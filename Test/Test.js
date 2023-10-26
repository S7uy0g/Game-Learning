const canvas=document.getElementById('Test');
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const DroneImage=new Image();
DroneImage.src='Forward.png';
const BoomImage=new Image();
BoomImage.src='Boom.png';
let gameFrame=0;
let canvasPosition=canvas.getBoundingClientRect();
const explosions=[];


// class Enemy{
//     constructor(){
//         this.ex=0;
//         this.ey=100;
//         this.width=128;
//         this.height=128;
//         this.enemyWidth=48;
//         this.enemyHeight=48;
//         this.frame=0;
//     }
// }
class Explosion{
    constructor(x,y){
        this.x=x;
        this.y=y;
        this.enemyWidth=200;
        this.enemyHeight=172;
        this.width=50;
        this.height=50;
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
window.addEventListener('click',function(e){
    let positionX=e.x-canvasPosition.left-25;
    let positionY=e.y-canvasPosition.top-25;
    explosions.push(new Explosion(positionX,positionY));
});
window.addEventListener('mousemove',function(e){
    let positionX=e.x-canvasPosition.left-25;
    let positionY=e.y-canvasPosition.top-25;
    explosions.push(new Explosion(positionX,positionY));
});

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    // ctx.drawImage(DroneImage,frame*enemyWidth,0,enemyWidth,enemyHeight,x,100,100,100);
    // if(gameFrame%10===0){
    //     frame++;
    //     if(frame>=4){
    //         frame=0;
    //     }
    // }
    // x+=5;
    // gameFrame++;
    for(let i=0;i<explosions.length;i++){
        explosions[i].update();
        explosions[i].draw();
        if(explosions[i].frame>5){
            explosions.splice(i,1);
            i--;
        }
    }
    gameFrame++;
    requestAnimationFrame(animate);
}
animate();