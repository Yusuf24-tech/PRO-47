var bgImg,shooter,shooting,zombies,heart1Img,heart2Img,heart3Img,bullet,bullets=55;
var zombieGroup,bulletGroup;
var gameState="fight";
var life=3;
var score=0;

function preload(){
bgImg=loadImage("Assets/bg.jpeg")
shooter=loadImage("Assets/shooter_2.png")
shooting=loadImage("Assets/shooter_3.png")
zombies= loadImage("Assets/zombie.png")
heart1Img=loadImage("Assets/heart_1.png")
heart2Img=loadImage("Assets/heart_2.png")
heart3Img=loadImage("Assets/heart_3.png")
}

function setup() {
  createCanvas(windowWidth,windowHeight);
bg= createSprite(windowWidth/2-20,windowHeight/2-20,10,10) 
bg.addImage("bg",bgImg)
bg.scale=1.1;

player= createSprite(windowWidth/2-300,windowHeight/2,50,20)
player.addImage("shooter",shooter)
player.scale=0.4;
player.debug=true;
player.setCollider("rectangle",0,0,300,300)

heart1=createSprite(displayWidth/2+400,displayHeight/2-300,10,10)
heart1.addImage("heart1",heart1Img)
heart1.scale=0.3
heart1.visible=true;

heart2=createSprite(displayWidth/2+430,displayHeight/2-300,10,10)
heart2.addImage("heart2",heart2Img)
heart2.scale=0.3
heart2.visible=false;

heart3=createSprite(displayWidth/2+460,displayHeight/2-300,10,10)
heart3.addImage("heart3",heart3Img)
heart3.scale=0.3
heart3.visible=false;

zombieGroup= new Group();
bulletGroup= new Group();

}

function draw() {
  background(255,255,255);
  if(gameState==="fight"){
   

    
  drawSprites();
  fill("yellow")
  textSize(20)
  text("Score :"+score,displayWidth/2+450,displayHeight/2-250);
if(keyDown(UP_ARROW)) {
player.y=player.y-2;
}
if(keyDown(DOWN_ARROW)) {
  player.y=player.y+2;
  }
  if(keyWentDown("space")){
player.addImage("shooter",shooting)
  }
  else if(keyWentUp("space")){
player.addImage("shooter",shooter)
bullet=createSprite(windowWidth/2-250,player.y,20,10)
bullet.velocityX=20;
bulletGroup.add(bullet);
player.depth=bullet.depth
player.depth=player.depth+2
bullets=bullets-1;

  }
if(zombieGroup.isTouching(player)){
for(var i=0 ;i< zombieGroup.length;i++){
if(zombieGroup[i].isTouching(player)){
  zombieGroup[i].destroy();
  life=life-1;


}
}
}
console.log(life)
  if(zombieGroup.isTouching(bulletGroup)){
    for(var i=0; i< zombieGroup.length; i++){
    if(zombieGroup[i].isTouching(bulletGroup)){
zombieGroup[i].destroy();
bulletGroup.destroyEach();
score=score+2;
    }
    }
  }
    
if(life==3){
  heart3.visible=true;
  heart2.visible=false;
  heart1.visible=false;
}
if(life==2){
  heart3.visible=false;
  heart2.visible=true;
  heart1.visible=false;
}
if(life==1){
  heart3.visible=false;
  heart2.visible=false;
  heart1.visible=true;
  
}
  spawnEnemies();
  if(bullets===0){
  gameState="bullet"

  
  }
  if(life===0){
    gameState="lost"
    }
    if(score=== 100){
      gameState="won"
    }
}
else if(gameState=== "bullet"){
  textSize(15);
  fill("yellow");
  text("You Ran Out OF Bullets",displayWidth/2,displayHeight/2-100 );
  zombieGroup.destroyEach();
  player.destroy();
  bulletGroup.destroyEach();
}
if(gameState==="lost"){
  textSize(100)
  fill("red")
  text("You Lost",displayWidth/2-100,displayHeight/2-100)
  zombieGroup.destroyEach();
  player.destroy();

}
if(gameState==="won"){
  textSize(100)
  fill("red")
  text("You Won",displayWidth/2-100,displayHeight/2-100)
  zombieGroup.destroyEach();
  player.destroy();

}


}

function spawnEnemies(){
  if(frameCount % 100 === 0){
zombie= createSprite(windowWidth,windowHeight/2,50,20)
zombie.velocityX=-2;
zombie.y= Math. round(random(200,windowHeight-200))
zombie.addImage("zombie",zombies)
zombie.scale=0.15;
zombie.lifetime=displayWidth/-2;
zombie.debug=true;
zombie.setCollider("rectangle",0,0,400,600)
zombieGroup.add(zombie);
  }
}


