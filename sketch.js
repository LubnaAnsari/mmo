var banana,bananaImage;
var monkey,monkey_running;
var ground,groundImage,invisibleGround;
var obstacle,obstacleImage;
var score = 0;
var gameOverImage;
var foodGroup, obstacleGroup;
var gameState = "play";

function preload(){
  
    monkey_running =  loadAnimation("Monkey1.png","Monkey2.png","Monkey3.png","Monkey4.png","Monkey5.png","Monkey6.png","Monkey7.png","Monkey8.png","Monkey9.png","Monkey10.png");
  
 bananaImage = loadImage("banana.png");

 obstacleImage = loadImage("stone.png");
  
 groundImage = loadImage("jungle.jpg");
  
  gameOverImage = loadImage("gameOver.jpg")
}

function setup() {
  createCanvas(400,400);
  
  ground = createSprite(0,0,600,600);
  ground.addImage("ground",groundImage)
  ground.x = ground.width/2;
  ground.scale = 1;
  ground.visibility = false;
  
  invisibleGround = createSprite(300,285,600,10);
  invisibleGround.visible = false;
  
  monkey = createSprite(80,250);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
  gameOver = createSprite(200,200);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.5  
    
  foodGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {
  background("white");
  
   ground.velocityX = -3;
  if (ground.x<0)
  {
    ground.x = ground.width/2;
  }
  
   if(keyDown("space")&& monkey.y >= 140){
    monkey.velocityY = -12;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  if(gameState === "play"){
     
     scores();
     banana();
    obstacle();
    
     gameOver.visible = false;
    
    if(foodGroup.isTouching(monkey)){
       foodGroup.destroyEach();
       score = score+2;
    }
   
    if(obstacleGroup.isTouching(monkey)){
       foodGroup.destroyEach();
       obstacleGroup.destroyEach();
       
      
       monkey.scale = 0.1;

      gameState = "end";
    }
  }
  
  if(gameState === "end"){
    gameOver.visible = true;
    monkey.visible = false;
    
     foodGroup.setVelocityXEach(0);
     obstacleGroup.setVelocityXEach(0);
    
       score = 0;
    
     if(mousePressedOver(gameOver)) {
        reset();
    }
     }
  
  monkey.collide(invisibleGround);
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score,300,50);
  }


function reset(){
  gameState = "play";
  gameOver.visible=false;
  obstacleGroup.destroyEach();
  monkey.visible = true;
  monkey.changeAnimation("running",monkey_running);
  score = 0;
}

function scores(){
  switch(score){
    case 10: monkey.scale=0.12;
             break;
    case 20: monkey.scale=0.14;
             break;
    case 30: monkey.scale=0.16;
             break;
    case 40: monkey.scale=0.18;
             break;  
    default: break;
  }
}



function banana() {
  
  if (frameCount % 80 === 0) {
    var banana = createSprite(400,20,40,10);
    banana.y = Math.round(random(120,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
     monkey.lifetime = 300;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each banana to the group
    foodGroup.add(banana);
  }
}

function obstacle(){
  
  
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(400,260,40,10);
    obstacle.x = Math.round(random(440,500));
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -3;
    
     //assign lifetime to the variable
     obstacle.lifetime = 300;
    
    //adjust the depth
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}



