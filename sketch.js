var monkey, monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup 
var score
var ground
var obstaclesGroup

function preload(){
  
  
  monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600, 600);
  
  monkey = createSprite(50,160,20,50);
  monkey.addAnimation("monkey", monkey_running)
  monkey.scale = 0.075
  
  bananaGroup = new Group();
  obstaclesGroup = new Group();
  
 ground = createSprite(200,180,600,20);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  score = frameCount
}


function draw() {

  background(255);
  
  if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
   
  }
   
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(ground);
  
  if (monkey.isTouching(bananaGroup)){
    score = score+10;
    bananaGroup.destroyEach();
  }
  
  if (monkey.isTouching(obstaclesGroup)){
    monkey.destroy();
    bananaGroup.destroyEach();
    obstaclesGroup.destroyEach();
    text("GAME OVER", 150, 200);
    text.fill("red")
  }
  
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  text("Score: "+ score, 500,50);
  
  spawnBananas()
  spawnObstacles()
  drawSprites()

}


function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(300,150,10,40);
   obstacle.addImage("obstacle", obstacleImage);
   obstacle.velocityX = -5;
   obstacle.scale=0.07
   obstacle.setCollider("rectangle",0,0,obstacle.width,obstacle.height);
  obstacle.debug = true
   obstaclesGroup.add(obstacle)
 }
}

function spawnBananas() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.addImage("banana", bananaImage)
    banana.scale = 0.1
    banana.y = Math.round(random(80,120));
    banana.velocityX = -3;
    bananaGroup.add(banana);
  }
  
}