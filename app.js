'use strict';

var paths = ['breakfast.jpg', 'dragon.jpg', 'sweep.png', 'wine-glass.jpg',
  'bag.jpg', 'bubblegum.jpg', 'pen.jpg', 'tauntaun.jpg',
  'banana.jpg', 'chair.jpg', 'pet-sweep.jpg', 'unicorn.jpg',
  'bathroom.jpg', 'cthulhu.jpg', 'scissors.jpg', 'usb.gif',
  'boots.jpg', 'dog-duck.jpg', 'shark.jpg', 'water-can.jpg'];
var items = [];
var totalTurns = [];



var displayAreaOne = document.getElementById('image_area_one');
var displayAreaTwo = document.getElementById('image_area_two');
var displayAreaThree = document.getElementById('image_area_three');

for(var i = 0; i < paths.length; i++){
  var newItem = new ItemImage(paths[i].split('.')[0], paths[i]);
  items.push(newItem);
}

displayAreaOne.addEventListener('click', clickHandler);
displayAreaTwo.addEventListener('click', clickHandler);
displayAreaThree.addEventListener('click', clickHandler);

function clickHandler(event) {

  var targetString = event.target.src;
  var targetPath = targetString.split('assets')[1];
  var itemPath;

  for (var i = 0; i < items.length; i++) {
    itemPath = items[i].path.split('assets')[1];
    if (itemPath === targetPath){
      items[i].clicked += 1;
    }
  }
  changePicture();
}

function ItemImage(name, path) {//constructor
  this.name = name;
  this.path = 'assets/' + path;
  this.clicked = 0;
  this.shown = 0;
}

function changePicture() {
  var imageOne = document.getElementById('image_one');
  var imageTwo = document.getElementById('image_two');
  var imageThree = document.getElementById('image_three');

  var imagesPerTurn = [];
  var randomIndex;
  //var previousTurnImages = [totalTurns[totalTurns.length - 1][0], totalTurns[totalTurns.length - 1][0], totalTurns[totalTurns.length - 1][0]];

  for (var i = 0; i < 3; i++) {
    if (i === 1) {
      while (imagesPerTurn.length === 1) {
        randomIndex = generateRandomNumber();
        if (imagesPerTurn[0] !== randomIndex){//&& previousTurnImages[0] !== randomIndex && previousTurnImages[1] !== randomIndex && previousTurnImages[2] !== randomIndex
          imagesPerTurn.push(randomIndex);
          items[randomIndex].shown += 1;
        }
      }
    } else if (i === 2) {
      while (imagesPerTurn.length === 2) {
        randomIndex = generateRandomNumber();
        if (imagesPerTurn[0] !== randomIndex && imagesPerTurn[1] !== randomIndex){// && previousTurnImages[0] !== randomIndex && previousTurnImages[1] !== randomIndex && previousTurnImages[2] !== randomIndex
          imagesPerTurn.push(randomIndex);
          items[randomIndex].shown += 1;
        }
      }
    } else {
      randomIndex = generateRandomNumber();
      //if (previousTurnImages[0] !== randomIndex && previousTurnImages[1] !== randomIndex && previousTurnImages[2] !== randomIndex) {
      imagesPerTurn.push(randomIndex);
      items[randomIndex].shown += 1;
      //}
    }
  }
  imageOne.src = 'assets/' + paths[imagesPerTurn[0]];
  imageTwo.src = 'assets/' + paths[imagesPerTurn[1]];
  imageThree.src = 'assets/' + paths[imagesPerTurn[2]];

  totalTurns.push(imagesPerTurn);

  function generateRandomNumber() {
    return Math.floor(Math.random() * paths.length);
  }
}
