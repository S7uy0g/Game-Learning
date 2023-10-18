const buttonIdle = document.getElementById("buttonIdle");
const buttonRun = document.getElementById("buttonRun");
const buttonAttack1 = document.getElementById("buttonAttack1");
const buttonAttack2 = document.getElementById("buttonAttack2");
const buttonAttack3 = document.getElementById("buttonAttack3");
const buttonDead = document.getElementById("buttonDead");
const buttonHurt = document.getElementById("buttonHurt");
const buttonJump = document.getElementById("buttonJump");
const buttonWalk = document.getElementById("buttonWalk");
const buttonShield = document.getElementById("buttonShield");


const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

function idle() {
    const src = 'Idle.png';
    const frames = 5;
    animate(src, frames);
}

function run() {
    const src = 'Run.png';
    const frames = 7;
    animate(src, frames);
}
function Attack1() {
    const src = 'Attack_1.png';
    const frames = 4;
    animate(src, frames);
}

function Attack2() {
    const src = 'Attack_2.png';
    const frames = 2;
    animate(src, frames);
}
function Attack3() {
    const src = 'Attack_3.png';
    const frames = 3;
    animate(src, frames);
}

function Dead() {
    const src = 'Dead.png';
    const frames = 3;
    animate(src, frames);
}
function Hurt() {
    const src = 'Hurt.png';
    const frames = 1;
    animate(src, frames);
}

function Jump() {
    const src = 'Jump.png';
    const frames = 11;
    animate(src, frames);
}
function Walk() {
    const src = 'Walk.png';
    const frames = 7;
    animate(src, frames);
}

function Shield() {
    const src = 'Shield.png';
    const frames = 3;
    animate(src, frames);
}


function animate(src, Frames) {
    // Player image
    const spriteWidth = 128;
    const spriteHeight = 128;
    let frameX = 0;
    let frameY = 0;
    let gameFrame = 0;
    const staggerFrame = 3;
    const playerImage = new Image();
    playerImage.src = src; // Use the parameter 'src' here

    // Define an update function to redraw the canvas and request the next frame
    function update() {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.drawImage(
            playerImage,
            frameX * spriteWidth,
            frameY * spriteHeight,
            spriteWidth,
            spriteHeight,
            0,
            0,
            CANVAS_WIDTH,
            CANVAS_HEIGHT
        );
        if (gameFrame % staggerFrame == 0) {
            if (frameX < Frames) frameX++;
            else frameX = 0;
        }
        gameFrame++;
        requestAnimationFrame(update); // Use 'update' here to request the next frame
    }

    // Call 'update' to start the animation
    update();
}
idle();
buttonIdle.addEventListener("click", idle);
buttonRun.addEventListener("click", run); 
buttonAttack1.addEventListener("click", Attack1);
buttonAttack2.addEventListener("click", Attack2);
buttonAttack3.addEventListener("click", Attack3);
buttonDead.addEventListener("click", Dead);
buttonHurt.addEventListener("click", Hurt);
buttonJump.addEventListener("click", Jump);
buttonWalk.addEventListener("click", Walk);
buttonShield.addEventListener("click", Shield);
