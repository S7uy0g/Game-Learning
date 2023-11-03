//document.addEventListener('DOMContentLoaded',function(){
    const canvas=document.getElementById('canvas1');
    const ctx=canvas.getContext('2d');
    canvas.width=600;
    canvas.height=600;

    class Game{
        constructor(ctx,width,height){
            this.ctx=ctx;
            this.width=width;
            this.height=height;
            this.enemies=[];
            this.enemyInterval=200;
            this.enemyTimer=0;
            this.enemyTypes=["Atype","Btype","Ctype"];
            //this.#addNewEnemy();
            //console.log(this.enemies);
        }
        update(deltaTime){
            this.enemies=this.enemies.filter(Object=>!Object.markedForDeletion);
            if(this.enemyTimer>this.enemyInterval){
                this.#addNewEnemy();
                this.enemyTimer=0;
            }else{
                this.enemyTimer+=deltaTime;
            }
            this.enemies.forEach(Object=>Object.update(deltaTime));
        }
        draw(){
            this.enemies.forEach(Object=>Object.draw(this.ctx));
        }
        #addNewEnemy(){
            const randomEnemy=this.enemyTypes[Math.floor(Math.random()*this.enemyTypes.length)];
            console.log(randomEnemy);
            if(randomEnemy=='Atype') this.enemies.push(new enemyA(this));
            else if(randomEnemy=='Btype') this.enemies.push(new enemyB(this));
            else if(randomEnemy=='Ctype') this.enemies.push(new enemyC(this));
            this.enemies.sort(function(a,b){
                return a.y-b.y;
            })
        }
    }

    class Enemy{
        constructor(game){
            this.game=game;
            //console.log(this.game);
            this.x=this.game.width;
            this.y=Math.random()*this.game.height;
            this.width=100;
            this.height=100;
            this.markedForDeletion=false;
            this.frameInterval=100;
            this.frameTimer=0;
            this.frame;
            this.maxFrame=3;
        }
        update(deltaTime){
            this.x-=this.speed*deltaTime;
            if(this.x<0-this.width)this.markedForDeletion=true;
            if(this.frameTimer>this.frameInterval){
                if(this.frame<this.maxFrame)this.frame++;
                else this.frame=0;
                this.frameTimer=0;
            }else{
                this.frameTimer+=deltaTime;
            }
        }
        draw(){
            ctx.drawImage(this.image,this.frame*this.spriteWidth,0,this.spriteWidth,this.spriteHeight,this.x,this.y,this.width,this.height);
        }
    }

    class enemyA extends Enemy{
        constructor(game){
            super(game);
            this.x=this.game.width;
            this.y=Math.random()*this.game.height;
            this.width=96;
            this.height=96;
            this.spriteWidth=48;
            this.spriteHeight=48;
            this.image=enemy1;
            this.speed=Math.random()*0.1+0.1;
        }
    }
    class enemyB extends Enemy{
        constructor(game){
            super(game);
            this.x=this.game.width;
            this.y=Math.random()*this.game.height;
            this.width=96;
            this.height=96;
            this.spriteWidth=48;
            this.spriteHeight=48;
            this.image=enemy2;
            this.speed=Math.random()*0.2+0.1;
            this.angle=0;
            this.curve=Math.random()*3;
        }
        draw(){
            ctx.save();
            ctx.globalAlpha=0.5;
            super.draw(ctx);//Main class draw called
            ctx.restore();
        }
        update(deltaTime){
            super.update(deltaTime);
            this.y+=Math.sin(this.angle)*this.curve;
            this.angle+=0.04;
        }
    }
    class enemyC extends Enemy{
        constructor(game){
            super(game);
            this.y=this.game.height;
            this.x=Math.random()*(this.game.width-100);
            this.width=96;
            this.height=96;
            this.spriteWidth=96;
            this.spriteHeight=96;
            this.image=enemy3;
            this.speed=Math.random()*1+2;
        }
        update(deltaTime){
            //super.update(deltaTime)
            this.y-=this.speed;
            if(this.y<0-this.height)this.markedForDeletion=true;
            if(this.frameTimer>this.frameInterval){
                if(this.frame<this.maxFrame)this.frame++;
                else this.frame=0;
                this.frameTimer=0;
            }else{
                this.frameTimer+=deltaTime;
            }
        }
    }


    const game=new Game(ctx,canvas.width,canvas.height);
    let lastTime=1;
    function animate(timeStamp){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        const deltaTime=timeStamp-lastTime;
        lastTime=timeStamp;
        game.update(deltaTime);
        game.draw();
        //console.log(game.enemies[0].x);
        //Removing enemy using splice
        // if(game.enemies[0].x<200){
        //     game.enemies.splice(0,1);
        // }
        //console.log(deltaTime);
        requestAnimationFrame(animate);
    }
    animate(0);
//});