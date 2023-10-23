const canvas=document.getElementById('canvas4');
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;
const fillColor1 = "red";
const fillColor2 = "blue";
let x=100;
let x2=300;
let d1=1;
let d2=-1;
const EnemyImage=new Image();
EnemyImage.src='NPCRunAttack.png';
const HurtImage=new Image();
HurtImage.src='NPCHurt.png';
let gameFrame=0;
let hurtFrame=0;
class Enemy{
    constructor(EnemyImage){
        this.x=100;
        this.x2=300;
        this.y=400;
        this.a=100;
        this.b=100;
        this.Tw=100;
        this.Th=100;
        this.width=128;
        this.height=128;
        this.enemyWidth=128;
        this.enemyHeight=128;
        this.frame=0;
        this.hurtC=false;
        this.hurt=0;
        this.temp=0;
        this.bounceSpeed=Math.floor(Math.random()*3+3);
    }
    update(){
        this.x+=d1;
        this.x2+=d2;
        if(this.x+40>=this.x2){
            d1=-1;
            d2=3;
            this.hurtC=true;
            this.frame = 0;
            this.hurt = 0;
            hurtFrame = 0;
        }
        if(this.x<=-40){
            d1=1;
        }
        if(this.x2+80>=CANVAS_WIDTH){
            d2=-3;
        }
        if(gameFrame%3===0){
            this.frame > 8 ? this.frame= 0:this.frame++;
        }
        if(hurtFrame%10===0){
            this.hurt > 4 ? this.hurt= 0:this.hurt++;
            if(this.hurt>4){
                this.hurtC=false;
            }
        }
    }
    drawA(){
        ctx.drawImage(EnemyImage,this.frame*this.enemyWidth,0,this.enemyWidth,this.enemyHeight,this.x,this.y,this.width,this.height);
    }
    drawB(){
        if(this.hurtC==true){
            ctx.drawImage(HurtImage,this.hurt*this.enemyWidth,0,this.enemyWidth,this.enemyHeight,this.x2,this.y,this.width,this.height);
        }else{
            ctx.drawImage(EnemyImage,this.frame*this.enemyWidth,0,this.enemyWidth,this.enemyHeight,this.x2,this.y,this.width,this.height);
        }
    }
    drawC(){
        ctx.fillRect(this.a,this.b,this.Tw,this.Th);
    }
    cUpdate(){
        this.a++;
        this.Tw++;
        if(this.Tw===150){
            this.Tw=100;
        }
    }
};
const slime=new Enemy();
function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    slime.update();
    slime.drawA();
    slime.drawB();
    gameFrame++;
    hurtFrame++;
    slime.cUpdate();
    slime.drawC();
    requestAnimationFrame(animate);
}
animate();