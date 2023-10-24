const canvas=document.getElementById("canvas2");
const ctx=canvas.getContext('2d');
const CANVAS_WIDTH=canvas.width=800;
const CANVAS_HEIGHT=canvas.height=700;
let gameSpeed=1;


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
    //LONG WAY
    // ctx.drawImage(backgroundImage,0,0,4608,1296,x,0,2304,CANVAS_HEIGHT);
    // ctx.drawImage(landImage2,0,0,576,324,x,380,1152,324);
    // ctx.drawImage(landImage1,0,0,500,324,x,380,1152,324);
    // ctx.drawImage(landImage2,0,0,500,324,x,450,1152,324);
    // ctx.drawImage(backgroundImage,0,0,4608,1296,x2,0,2304,CANVAS_HEIGHT);
    // ctx.drawImage(landImage2,0,0,500,324,x2,380,1152,324);
    // ctx.drawImage(landImage1,0,0,500,324,x2,380,1152,324);
    // ctx.drawImage(landImage2,0,0,500,324,x2,450,1152,324);
    // if(x<-1152)x=1152+x2-gameSpeed;
    // else x-=gameSpeed;
    // if(x2<-1152)x2=1152+x-gameSpeed;
    // else x2-=gameSpeed;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    gameObject.forEach(Object =>{
        Object.update();
        Object.draw();
    });
    requestAnimationFrame(animate);
}
animate();