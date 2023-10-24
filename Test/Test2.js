const canvas=document.getElementById('Test');
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;
let gameSpeed=1;

const DroneImage=new Image();
DroneImage.src='Forward.png';
const BoomImage=new Image();
BoomImage.src='boom.png';
let frame=0;
let gameFrame=0;
let x=0;
//let canvasPosition=canvas.getBoundingClientRect();
const explosions=[];

const backgroundImage=new Image();
backgroundImage.src='background1.png';
const landImage1=new Image();
landImage1.src='Land1.png';
const landImage2=new Image();
landImage2.src='Land2.png';
const landImage3=new Image();
landImage3.src='Land3.png';
// let x=0;
// let x2=1152;

const slider=document.getElementById("slider");
const sliderValue=document.getElementById("showGameSpeed");
slider.addEventListener("input", function() {
    var sliderVal = slider.value;
    sliderValue.innerHTML = "Value: " + sliderVal;
    gameSpeed=sliderVal;
  });

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
    BoomAnimation(e);
});
// window.addEventListener('mousemove',function(e){
//     BoomAnimation(e);
// });

function BoomAnimation(e){
    let canvasPosition=canvas.getBoundingClientRect();
    let positionX=e.x-canvasPosition.left-25;
    let positionY=e.y-canvasPosition.top-25;
    explosions.push(new Explosion(positionX,positionY));
}

class Layer{
    constructor(image, speedModifier){
        this.x=0;
        this.y=0;
        this.width=2400;
        this.height=700;
        this.x2=this.width;
        this.image=image;
        this.speedModifier=speedModifier;
        this.speed=gameSpeed*this.speedModifier;
    }
    update(){
        //Right to Left
        // this.speed=gameSpeed*this.speedModifier;
        // if(this.x>this.width){
        //     this.x=-this.width+this.x2+this.speed;
        // }
        // if(this.x2>this.width){
        //     this.x2=-this.width+this.x+this.speed;
        // }
        // this.x=Math.floor(this.x+this.speed);
        // this.x2=Math.floor(this.x2+this.speed);

        //Left to right
        this.speed=gameSpeed*this.speedModifier;
        if(this.x<-this.width){
            this.x=this.width+this.x2-this.speed;
        }
        if(this.x2<-this.width){
            this.x2=this.width+this.x-this.speed;
        }
        this.x=Math.floor(this.x-this.speed);
        this.x2=Math.floor(this.x2-this.speed);

    }
    draw(){
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
        ctx.drawImage(this.image,this.x2,this.y,this.width,this.height);
    }
}
const layer1=new Layer(backgroundImage,1);
const layer3=new Layer(landImage2,2.5);
const layer2=new Layer(landImage1,2.5);
const layer4=new Layer(landImage3,2.5);
const gameObject=[layer1,layer3,layer2,layer4];
function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    gameObject.forEach(Object =>{
        Object.update();
        Object.draw();
    });
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