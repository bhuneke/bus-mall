'use strict';

var paths = ['breakfast.jpg', 'dragon.jpg', 'sweep.png', 'wine-glass.jpg',
  'bag.jpg', 'bubblegum.jpg', 'pen.jpg', 'tauntaun.jpg',
  'banana.jpg', 'chair.jpg', 'pet-sweep.jpg', 'unicorn.jpg',
  'bathroom.jpg', 'cthulhu.jpg', 'scissors.jpg', 'usb.gif',
  'boots.jpg', 'dog-duck.jpg', 'shark.jpg', 'water-can.jpg'];
  //all existing images stored in an array
var items = [];
  //create an array to store all objects that will hold customer input
var displayIndex = 0;
  //starting point to track number of times an item is clicked

var displayAreaOne = document.getElementById('image_area_one');//retrieve DOM node to set boundary of clickable area
var displayAreaTwo = document.getElementById('image_area_two');
var displayAreaThree = document.getElementById('image_area_three');

for(var i = 0; i < paths.length; i++){
  var newItem = new ItemImage(paths[i]);//creates a new object for every item in the "paths" array
  items.push(newItem);//adds created object to the "items" array, which will store additional information like name, path, number of times clicked, and number of times shown
}

displayAreaOne.addEventListener('click', clickHandler);//add event listener so when defined DOM node is clicked, the event handler function will run
displayAreaTwo.addEventListener('click', clickHandler);
displayAreaThree.addEventListener('click', clickHandler);

function clickHandler(event) {
  items[displayIndex].clicked += 1;//add one to the tally of number of times clicked on the item object (displayIndex should equal randomIndex per the changePicture function)

  var targetString = event.target.src;//grabs the src information from the DOM node involved in the event and stores it on a variable
  var targetPath = targetString.split('assets')[1];//split divides the src path into two and stores it in an array, where "assets" occurs in the string is the dividing point and is omitted from the resulting array, the [1] isolates the 2nd item in the array
  var itemPath; //declare variable for use in the for loop

  for (var i = 0; i < items.length; i++) {
    itemPath = items[i].path.split('assets')[1];//reassign variable to equal the split the path from each objects stored on the items array
    if (itemPath === targetPath){
      items[i].clicked += 1;
    }
  }
  changePicture();
}

function ItemImage(path) {//constructor
  this.path = 'assets/' + path;
  this.clicked = 0;
  this.shown = 0;
}

function changePicture() {
  var imageOne = document.getElementById('image_one');
  var imageTwo = document.getElementById('image_two');
  var imageThree = document.getElementById('image_three');
  var randomIndexOne = generateRandomNumber();
  while (displayIndex === randomIndexOne) {
    randomIndexOne = generateRandomNumber();
  }
  displayIndex = randomIndexOne;
  imageOne.src = 'assets/' + paths[randomIndexOne];

  var randomIndexTwo = generateRandomNumber();
  while (displayIndex === randomIndexTwo) {
    randomIndexTwo = generateRandomNumber();
  }
  displayIndex = randomIndexTwo;
  imageTwo.src = 'assets/' + paths[randomIndexTwo];

  var randomIndexThree = generateRandomNumber();
  while (displayIndex === randomIndexThree) {
    randomIndexThree = generateRandomNumber();
  }
  displayIndex = randomIndexThree;
  imageThree.src = 'assets/' + paths[randomIndexThree];

  function generateRandomNumber() {
    return Math.floor(Math.random() * paths.length);
  }
}
