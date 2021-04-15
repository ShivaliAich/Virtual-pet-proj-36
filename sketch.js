//Create variables here
var dog, happyDog, database, foodS, foodStock,dogImg, happyImg;
var addFood, feedPet,fedTime,lastFed,foodObj;
var readState, changeState,gameState = "hungry";
var bedroom,garden,washroom;
var sadDog, currentTime;
function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  
  happyImg = loadImage("images/dogImg1.png");

  bedroom = loadImage("images/Bed Room.png");

  washroom = loadImage("images/Wash Room.png");

  garden =  loadImage("images/Garden.png");
  sadDog = loadImage("images/deadDog.png");
  
}

function setup() {
  database = firebase.database();
  
  
	createCanvas(800, 800);
  dog = createSprite(680,250,10,10);
  
  dog.addImage(dogImg);

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  foodObj = new Food();

  feed= createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods)

  namePet=createButton("Name The Dog");
  namePet.position(800,790);
  namePet.mousePressed(pet)

  //read gamestate from database
  readState = database.ref('GameState');
  readState.on("value",function(data){
    gameState = data.val();
  });
}


function draw() {  
  background(rgb(46,139,87));
  dog.scale = 0.2;
  foodObj.display();

  
  
  
   
  drawSprites();
  //add styles here
  fill("black");
  textSize(20);
  stroke(12);
  text("Food Remaining : "+foodS,130,700);

 
 

fill(255,255,254);
textSize(15);
database.ref("LastFeed").on("value",function (data){
  lastFed = data.val();
})
if(lastFed>=12)
  text("Last Feed : "+lastFed%12 +" PM",350,30);

else if(lastFed==0)
text("Last Feed : 12 AM",350,30);
else
text("Last Feed : "+lastFed+" PM",350,30);


if(gameState != "Hungry"){
  feed.hide();
  addFood.hide();
  dog.remove();
}
else{
  feed.show();
  addFood.show();
  dog.addImage(sadDog);
}
currentTime = hour();
/*console.log("c" +currentTime);
console.log("l" +lastFed);*/
if(currentTime==(lastFed+1)){
  console.log("e1");
  gameState = "Playing";
  update("Playing");
  foodObj.garden();
  
}
else if(currentTime==(lastFed+2)){
  gamestate = "Sleeping";
  update("Sleeping");
  foodObj.bedroom();
}
else if(currentTime>(lastFed+2) || currentTime<=(lastFed+4)){
  console.log("bath"+ currentTime);
  gameState = "Bathing";
  update("Bathing");
  foodObj.washroom();
  
}
else{
  gameState = "Hungry";
  update("Hungry");
  foodObj.display();
  }
}
// function to read values from the database
function readStock (data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}
//function to write values in database
function writeStock(x){
  if(x<=0)
  x=0;
  else
  x-=1;
  database.ref('/').update({
    Food :x
  })
}
function feedDog(){
  dog.addImage(happyImg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food :foodObj.getFoodStock(),
    LastFeed : hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}
function pet(){
  fill("yellow");
  textSize(30);
 text("This Dog's name is Juno",400,600);
}
//updating gamestates
function update(state){
  database.ref('/').update({
    GameState: state 
  })
}





