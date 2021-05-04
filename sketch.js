//Create variables here
var dog, dogImg; 
var happyDogImg;
var database; 
var foodS, foodStock; 

function preload() {
  happyDogImg = loadImage("images/dogImg1.png"); 
  dogImg = loadImage("images/dogImg.png"); 
}

function setup() {
  //initialize firebase 
  database = firebase.database(); 

  createCanvas(500, 500);
  
  foodStock = database.ref('Food'); 
  foodStock.on("value", readStock); 
  foodStock.set(20);

  dog = createSprite(250,250,50,50);
  dog.addImage("dog", dogImg); 
  dog.scale = 0.2;
  dog.addImage("happyDog", happyDogImg); 
}

function draw() {  
  background(46, 139, 87); 

  if (foodS !== undefined) {
    //add styles here
    fill(0); 
    textSize(20); 
    text("Note: Press the UP ARROW key to feed the dog", 50, 50); 
    text("Food Remaining:" + foodS, 150, 150);

    if (keyDown(UP_ARROW)) {
      writeStock(foodS); 
      dog.changeImage("happyDog", happyDogImg); 
    }

    if (foodS === 0) {
      foodS = 20;
    }

  drawSprites();
  }
}

function writeStock(x) {
  if (x <= 0) {
    x = 0; 
  } else {
    x = x - 1;
  }
  
  database.ref('/').update({
    Food : x
  })
}

function readStock(data) {
  foodS = data.val(); 
}