var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var hero, heroImg;
var coin,coinImg
var playSound
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
 var score=0

function preload(){
  playSound=loadSound("nice.wav")
  towerImg = loadImage("tower.png");
  doorImg=loadImage("door.png")
  climberImg=loadImage("climber.png")
  heroImg=loadImage("HERO.png")
  coinImg=loadImage("dollar.png")
}

function setup(){
  createCanvas(600,600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = (1);
  doorsGroup=new Group()
  climbersGroup=new Group()
  coinsGroup=new Group()

 hero=createSprite(200,200,50,50)
 hero.addImage(heroImg)
 hero.scale=0.3
 
 

}

function draw(){
  background(0);
   if(gameState==="play"){
     
    if(tower.y > 400){
      tower.y = 30
    }
    

    if(keyDown("left")){
     hero.x=hero.x-3
    }
    if(keyDown("right")){
    hero.x=hero.x+3
    }
    if(keyDown("space")){
    hero.velocityY=-5
    
    }
    hero.velocityY=hero.velocityY+0.8
     if(keyDown("down")){
      playSound.play()
     }
    if(climbersGroup.isTouching(hero)||hero.y>600){
    gameState="end"
    hero.destroy()
    }
     if(coinsGroup.isTouching(hero)){
       coinsGroup.destroyEach()
      score=score+10
     }

    spawndoors()
    spawncoins()
    
    drawSprites();
  }
   if(gameState==="end"){
    textSize(30)
    fill ("yellow")
    text("GAME OVER" ,230,250) 
   }
   textSize(30)
   fill("blue")
   text("SCORE:"+score,370,50)
}
function spawndoors(){
  if(frameCount%240===0){
    door=createSprite(200,-50)
    door.velocityY=(1+score/5)
    door.addImage(doorImg)
    door.x=Math.round(random(120,400))
    door.lifetime=800
    doorsGroup.add(door)
    
    climber=createSprite(200,10)
    climber.velocityY=(1+score/5)
    climber.addImage(climberImg)
    climber.x=door.x
    climber.lifetime=800
    climbersGroup.add(climber)
  }
}  
function spawncoins(){
  if(frameCount%270===0){
    coin=createSprite(200,-90)
    coin.velocityY=(2+score/5)
    coin.scale=0.1
    coin.addImage(coinImg)
    coin.x=Math.round(random(50,300))
    coin.lifetime=800
    coinsGroup.add(coin) 
  }
}
