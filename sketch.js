let smallC;
let smallCMany;
let bigC;
let b0;
let b1;
let birdAnimation = [];
let obsTime = 0;

let dr0;
let dr1;
let dJ;
let animation = [];
let animCounter = 0;


const POP = 500;
let dinos = [];
let savedDinos = [];
let cactus = [];
let birds = [];
let scrollSpeed = 6;

let littlePs = [];
let pointsCounter;
let clouds = [];
let cloudsCounter;
let cscrollSpeed = 1;
let cloud00;
let cloud01;
let cloud02;

let counter = 0;
let slider;

let genNUM = 1;
let gameScore = 0;
let hgameScore= 0;
let genNum = 1;

function preload(){
    font = loadFont('fonts/Minecraft.ttf');

    cloud00 = loadImage('img/cloud00.png')
    cloud01 = loadImage('img/cloud01.png')
    cloud02 = loadImage('img/cloud02.png')

    smallC = loadImage('img/cactusSmall0000.png');
    smallCMany = loadImage('img/cactusSmallMany0000.png');
    bigC = loadImage('img/cactusBig0000.png');
    b0 = loadImage('img/berd.png');
    b1 = loadImage('img/berd2.png');

    dr0 = loadImage('img/dinorun0000.png');
    dr1 = loadImage('img/dinorun0001.png');
    dJ = loadImage('img/dinoJump0000.png');
}

function setup() {
    createCanvas(800, 200);
    slider = createSlider(1, 100, 1);

    //clouds random generator;
    setInterval(function(){
        var cloudsType = floor(random(0,3));
        cloudsCounter = (noise(frameCount))*100;
        if(cloudsCounter > 80){
            clouds.push(new Cloud(cloudsType));
        }
    },200);

    setInterval(function(){
        animCounter++;
        gameScore++;
    }, 100);

    animation[0] = dr0;
    animation[1] = dr1;

    birdAnimation[0] = b0;
    birdAnimation[1] = b1;

    for (let i = 0; i < POP; i++) {
        dinos[i] = new Dino();
    }
}




function drawGameScore(){
    textFont(font);
    fill(0,100,255);
    textAlign(CENTER,CENTER);
    textSize(20);
    text('Score: '+floor(gameScore), 500,40);
}

function drawhGameScore(){
    textFont(font);
    fill(255,0,100);
    textAlign(CENTER,CENTER);
    textSize(20);
    text('Highest Score: '+floor(hgameScore), 500,60);
}

function drawGen(){
    textFont(font);
    fill(0,255,100);
    textAlign(CENTER,CENTER);
    textSize(20);
    text('Generation Number: '+genNum, 500,20);

}

function sceneControl() {
    //scene control
    if (counter % 30 === 0) {
        //increase speed
        if (counter % 120 === 0) {
            scrollSpeed *= 1.02;
            cscrollSpeed *= 1.02;
        }

        //new obstacle
        var randomTime = noise(counter);
        var randomCac = floor(random(0,3));
        var randomBird = floor(random(0,2));
        if(obsTime > (randomTime * 200)){
            obsTime = 0;
            cactus.push(new Cactus(randomCac));
        } else if (random(1) < 0.10) {
            obsTime = 0;
            birds.push(new Bird(randomBird));
        }
    }
    obsTime++;
    counter++;

    //super useful points
    pointsCounter = noise(counter);
    if(pointsCounter > 0.7){
        pointsCounter = 0;
        littlePs.push(new LittleP());
    }

}

function process() {
    //cactus hits or off screem
    for (let i = cactus.length - 1; i >= 0; i--) {
        cactus[i].update(scrollSpeed);

        for (let j = dinos.length - 1; j >= 0; j--) {
            if (cactus[i].hits(dinos[j])) {
                savedDinos.push(dinos.splice(j, 1)[0]);
            };

        }

        if (cactus[i].isOffScreen()) {
            cactus.splice(i, 1);
        }
    }
    //birds hits or off screen
    for(let i = birds.length - 1; i >= 0; i--){
        birds[i].update(scrollSpeed);

        for (let j = dinos.length - 1; j >= 0; j--) {
            if (birds[i].hits(dinos[j])) {
                savedDinos.push(dinos.splice(j, 1)[0]);
            };

        }

        if(birds[i].isGone()){
            birds.splice[i, 1];
        }
    }

    for (let dino of dinos) {
        dino.update();
        dino.think(cactus, birds);
    }

    //points
    for (let i = littlePs.length - 1; i >= 0; i--){
        littlePs[i].update(scrollSpeed);

        if(littlePs[i].isGone()){
            littlePs.splice(i, 1);
        }
    }

    //clouds
    for (let i = clouds.length - 1; i >= 0; i--){
        clouds[i].update(cscrollSpeed);

        if(clouds[i].isGone()){
            clouds.splice(i, 1);
        }
    }
}

function draw() {

    for (let k = 0; k < slider.value(); k++) {

        if(gameScore > hgameScore){
            hgameScore = gameScore;
        }

        if (dinos.length === 0) {
            nextGen();
            genNum++;
            cactus = [];
            birds = [];
            scrollSpeed = 6;
            cscrollSpeed = 1;
            counter = 0;
            gameScore = 0;
        }

        sceneControl();
        process();
    }


    background(255);

    //floor
    noStroke();
    fill(0);
    rect(0, 180, 800, 1);
    for (let i = littlePs.length - 1; i >= 0; i--){
        littlePs[i].show();
    }
    //

    //clouds
    for (let i = clouds.length - 1; i >= 0; i--){
        clouds[i].show();
    }
    //

    for (let dino of dinos) {
        if(dino.isJumping === true){
            dino.show(dJ);
        } else {
            dino.show(animation[animCounter % animation.length]);
        }
    }

    for (let i = cactus.length - 1; i >= 0; i--) {
        cactus[i].show();
    }

    for(let i = birds.length - 1; i >= 0; i--){
        birds[i].show(birdAnimation[animCounter % birdAnimation.length]);
    }

    drawGameScore();
    drawhGameScore();
    drawGen();

}
