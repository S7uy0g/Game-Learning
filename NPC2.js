const canvas=document.getElementById("canvas3");
const ctx=canvas.getContext('2d');
CANVAS_WIDTH=canvas.width=600;
CANVAS_HEIGHT=canvas.height=600;

const numberOfEnemies=4;
const enemyArray=[];
const EnemyImage=new Image();
EnemyImage.src='Ghost.png';
let gameFrame=0;
//Side to Side with up and Down Movement
class Enemy{
    constructor(EnemyImage){
        //this.y=Math.random()*canvas.height;
        this.y=300;
        this.width=100;
        this.height=100;
        this.x=Math.random()*(canvas.width-this.width);
        //this.speed=Math.random()*4-2;
        this.direction=1;
        this.EnemyImage=EnemyImage;
        this.enemyWidth=128;
        this.enemyHeight=128;
        this.frame=0;
        this.bounceSpeed=Math.floor(Math.random()*2+2);
        this.angle=0;
        this.angleSpeed=Math.random()*0.09+0.2;
    }
    update(){
        this.x+=this.direction*this.bounceSpeed;
        this.y+=Math.sin(this.angle);
        this.angle+=this.angleSpeed;
        //this.y+=this.speed;
        if (this.x >= CANVAS_WIDTH-100 || this.x <= 0) {
            this.direction = -this.direction; // Reverse the direction
        }
        if(gameFrame%Math.floor(Math.random()*2+8)===0){
            this.frame > 2 ? this.frame= 0:this.frame++;
        }
    }
    draw(){
        ctx.drawImage(this.EnemyImage,this.frame*this.enemyWidth,0,this.enemyWidth,this.enemyHeight,this.x,this.y,this.width,this.height);
    }
};

for(let i=0;i<numberOfEnemies;i++){
    enemyArray.push(new Enemy(EnemyImage));
}
function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    enemyArray.forEach(enemy=>{
        enemy.update();
        enemy.draw();
    });
    gameFrame++;
    requestAnimationFrame(animate);
}
animate();
