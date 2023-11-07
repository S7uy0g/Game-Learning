window.addEventListener('load',function(){
    const canvas=document.getElementById('canvas1');
    const ctx=canvas.getContext('2d');
    canvas.width=600;
    canvas.height=600;


    class InputHandler{
        constructor(){
            this.keys=[];
            window.addEventListener('keydown',e=>{
                //onsole.log(e.key);
                if(( e.key==='ArrowUp'||
                     e.key==='ArrowDown'||
                     e.key==='ArrowLeft'||
                     e.key==='ArrowRight')
                     && this.keys.indexOf(e.key)=== -1&& this.keys.length<1){
                    this.keys.push(e.key);
                    console.log(this.keys);
                }
            });
            window.addEventListener('keyup',e=>{
                //onsole.log(e.key);
                if( e.key==='ArrowUp'||
                    e.key==='ArrowDown'||
                    e.key==='ArrowLeft'||
                    e.key==='ArrowRight'){
                    this.keys.splice(this.keys.indexOf(e.key),1);
                }
            });
        }
    }

    class Player{
        constructor(gameWidth,gameHeight){
            this.gameWidth=gameWidth;
            this.gameHeight=gameHeight;
            this.width=128;
            this.height=128;
            this.x=10;
            this.y=this.gameHeight-this.height;
            this.image=document.getElementById('Jump');
            this.spriteWidth=128;
            this.spriteHeight=128;
            this.frameX=0;
            this.gameFrame=0;
            this.frameTime=78;
            this.maxFrame=7;
            this.direction=1;
            this.vy=0;
            this.weight=1;
            this.isFlipped=false;
        }
        draw(context){
            context.fillStyle='white';
            context.fillRect(this.x,this.y,this.width,this.height);
            context.drawImage(this.image,this.frameX*this.spriteWidth,0,this.spriteWidth,this.spriteHeight,this.x,this.y,this.width,this.height);
        }
        update(deltaTime,input){
            //horizontal movement
            if(input.keys.indexOf('ArrowRight')>-1){
                this.direction=5;
                this.image=document.getElementById('Run');
                if(this.isFlipped){
                    this.image.classList.remove('flipped');
                    this.isFlipped=false;
                }
                if(this.gameFrame>this.frameTime){
                    if(this.frameX<this.maxFrame){
                        this.frameX++;
                        this.x+=this.direction;
                    }else this.frameX=0;
                    this.gameFrame=0;
                }else{
                    this.gameFrame+=deltaTime;
                }
            }else if(input.keys.indexOf('ArrowLeft')>-1){
                this.direction=-5;
                if(!this.isFlipped){
                    this.image.classList.add('flipped');
                    this.isFlipped=true;
                }
                // if(this.gameFrame>this.frameTime){
                //     if(this.frameX<this.maxFrame){
                //         this.frameX++;
                //         this.x+=this.direction;
                //     }else this.frameX=0;
                //     this.gameFrame=0;
                // }else{
                //     this.gameFrame+=deltaTime;
                // }
            }else if(input.keys.indexOf('ArrowUp')>-1 && this.onGround()){
                this.vy-=20;
                this.image=document.getElementById('Jump');
                this.frameX=0;
            }else{
                this.direction=0;
            }
            //Horizontal
            this.x+=this.direction;
            if(this.x<0)this.x=0;
            else if(this.x>this.gameWidth-this.width)this.x=this.gameWidth-this.width;
            //Vertical
            this.y+=this.vy;
            if(!this.onGround()){
                this.vy+=this.weight;
                //this.frameX=0;
                if(this.gameFrame>this.frameTime){
                    if(this.frameX<this.maxFrame){
                        this.frameX++;
                    }else this.frameX=0;
                    this.gameFrame=0;
                }else{
                    this.gameFrame+=deltaTime;
                }
            }else{
                this.vy=0;
                this.image=document.getElementById('Run');
                //this.frameX=5;
            }
            if(this.y>this.gameHeight-this.height)this.y=this.gameHeight-this.height;
        }
        onGround(){
            return this.y>=this.gameHeight-this.height;
        }

    }

    class background{

    }

    class Enemy{

    }

    function handleEnemies(){

    }

    function displayStatusText(){

    }

    const input=new InputHandler();
    const player=new Player(canvas.width,canvas.height);
    let lastTime=1;

    function animate(timeStamp){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        const deltaTime=timeStamp-lastTime;
        lastTime=timeStamp;
        player.draw(ctx);
        player.update(deltaTime,input);
        requestAnimationFrame(animate);
    }
    animate(0);
});