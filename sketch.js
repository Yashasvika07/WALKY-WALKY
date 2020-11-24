
var monkey , monkey_running, ground, bg, monkeyAnimation ;
var banana ,bananaImage, bananaGroup, start, story;
var storyImage, stone, stoneImage, stoneGroup;
var FoodGroup, obstacleGroup, bgImage, groundImage, startImage;
var inGround, eagle, eagleImage, eagleGroup, youlose;
var score = 0;
var START = 3;
var gameState = START;
var PLAY = 2;
var END = 1;
var Lifetime = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bgImage = loadImage("2020-11-18 (2).png");
  
  bananaImage = loadImage("banana.png");
  
  groundImage = loadImage("2020-11-18 (4).png");
  
  startImage = loadImage("2020-11-17 (2).png");
  
  monkeyAnimation = loadAnimation("sprite_0.png");
  
  startImage = loadImage("2020-11-17 (2)-1.png");
  
  storyImage = loadImage("Untitled.png");
  
  stoneImage = loadImage("rocks.png");
  
  eagleImage = loadImage("eagle.png");
  
  youlose = loadImage("youlose.png");
 
}



function setup() {
  createCanvas(500,400);
  
  start = createSprite(0,100,10,10);
  start.addImage(startImage);
  
  ground = createSprite(500,396,20,20);
  ground.addImage(groundImage);
  ground.velocityX = -5;
  
  bg = createSprite(350,150,10,10);
  bg.addImage(bgImage);
  bg.velocityX = -5;
  
  monkey = createSprite(45,270,10,10);
  monkey.addAnimation("monkey",monkeyAnimation);
  monkey.addAnimation("run", monkey_running);
  monkey.scale = 0.15;
  monkey.setCollider("circle",0,0,290);
  
  story = createSprite(370,310,20,20);
  story.addImage(storyImage);
  story.scale = 0.5;

  inGround = createSprite(250,330,500,10);
  
  stoneGroup = createGroup();
  eagleGroup = createGroup();
  bananaGroup = createGroup();
  
}

function stones (){
  stone = createSprite(530,260,10,10);
  stone.addImage(stoneImage);
  stone.velocityX = -5;
  stoneGroup.add(stone);
  stone.scale = 0.3;
  stone.setCollider("rectangle",600,100,210,280);
  stone.lifetime = 150;
}

function eagles (){
  eagle = createSprite(530,60,10,10);
  eagle.addImage(eagleImage);
  eagle.velocityX = -6;
  eagleGroup.add(eagle);
  eagle.scale = 0.2;
  eagle.setCollider("circle",0,0,250);
  eagleGroup.add(eagle);
  eagle.lifetime = 110;
  
}

function bananas (){
  banana = createSprite(530,Math.round(random(150,250)),10,10);
  banana.addImage(bananaImage);
  banana.velocityX = -5;
  bananaGroup.add(banana);
  banana.scale = 0.1;
  banana.setCollider("circle",0,0,150);
  banana.lifetime = 150;
}

function draw() {
  
  drawSprites();
  if(gameState === START){
    story.visible = true;
    bg.visible = false;
    start.visible = true;
    ground.visible = false;
    inGround.visible = false;
    monkey.x = 150;
    monkey.y = 350;
    fill("black");
    textFont("Segoe Script");
    textSize(18);
    text("A monkey has esca-",260,230);
    text("-ped a zoo. You have",256,245);
    text("to help him to eat all",256,260);
    text("the bananas. Press",265,275);
    text("SPACE to jump and ",256,290);
    text("'s' to start playing the",260,305);
    text("game.",260,320);
    text("~ 👧🏻",280,340);
     if(keyDown("s")){
       monkey.x = 45;
       monkey.y = 270;
       gameState = PLAY;
     }
  }
  else if(gameState === PLAY ){
    start.visible = false;
    ground.visible = true;
    bg.visible = true;
    story.visible =  false;
    inGround.visible = false;
    ground.velocityX = -4;
    bg.velocityX = -4;
    fill("coral");
    textSize(20);
    textFont("Segoe Script");
    text('Score : ' + score, 10, 30);
    Lifetime = Math.ceil(frameCount/frameRate());
    text('LIFETIME : ' + Lifetime, 200,30);
    
    if(bg.x <= 150){
      bg.x = 380;
    }
    if(ground.x <= 30){
      ground.x = 350;
    }
    monkey.changeAnimation("run", monkey_running);
    if (keyDown("space")){
      monkey.velocityY = -12;
    }
    
    monkey.velocityY = monkey.velocityY + 0.6;
    monkey.collide(inGround);
    
    if(frameCount%151 === 0){
      stones();
    }
    if(frameCount%110 === 0){
      eagles();
    }
    if(frameCount%125 === 0){
      bananas();
    }
    if(stoneGroup.isTouching(monkey) ||
       eagleGroup.isTouching(monkey)){
       stoneGroup.destroyEach();
       eagleGroup.destroyEach();
       bananaGroup.destroyEach();
       gameState = END ; 
    }
    if(bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
      score = score + 1;
    }
  }
  
  else if(gameState === END){
    start.visible = false;
    ground.visible = false;
    bg.visible = false;
    story.visible =  false;
    inGround.visible = false;
    monkey.visible = false;
    background(youlose);
  }

}







