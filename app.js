'use strict';

var paths = ['breakfast.jpg', 'dragon.jpg', 'sweep.png', 'wine-glass.jpg',
  'bag.jpg', 'bubblegum.jpg', 'pen.jpg', 'tauntaun.jpg',
  'banana.jpg', 'chair.jpg', 'pet-sweep.jpg', 'unicorn.jpg',
  'bathroom.jpg', 'cthulhu.jpg', 'scissors.jpg', 'usb.gif',
  'boots.jpg', 'dog-duck.jpg', 'shark.jpg', 'water-can.jpg'];
var items = [];
var totalTurns = [];
var previousTurnImages = [0, 0, 0];
var labelsChart = [];
var dataChart = [];
var numberOfClicks = 0;
var storedItemsString = localStorage.getItem('items');

var displayArea = document.getElementById('image_area');

for(var i = 0; i < paths.length; i++){
  var newItem = new ItemImage(paths[i].split('.')[0], paths[i]);
  items.push(newItem);
}

generateLabelsChart();

displayArea.addEventListener('click', clickHandler);

retrieveLocal();

function clickHandler(event) {

  var targetString = event.target.src;
  var targetPath = targetString.split('assets')[1];
  var itemPath;

  for (var i = 0; i < items.length; i++) {
    itemPath = items[i].path.split('assets')[1];
    if (itemPath === targetPath){
      items[i].clicked += 1;
      numberOfClicks += 1;
    }
  }
  changePicture();
  exitClicks();
  percentageClicked();
  recommendItem();
  storeLocal();
}

function ItemImage(name, path) {//constructor
  this.name = name;
  this.path = 'assets/' + path;
  this.clicked = 0;
  this.shown = 0;
  this.rawPercentage = 0;
  this.roundPercentage = 0;
  this.recommendation = '';
}

function percentageClicked() {
  for (var i = 0; i < items.length; i++) {
    var rawPercentage = (items[i].clicked / items[i].shown) * 100;
    var roundPercentage = Math.round(rawPercentage) + '%';
    items[i].rawPercentage = rawPercentage;
    items[i].roundPercentage = roundPercentage;
  }
};

function recommendItem(){
  for (var i = 0; i < items.length; i++) {
    if (items[i].rawPercentage < 40) {
      items[i].recommendation = 'no';
    } else {
      items[i].recommendation = 'yes';
    }
  }
};

function changePicture() {
  var imageOne = document.getElementById('image_one');
  var imageTwo = document.getElementById('image_two');
  var imageThree = document.getElementById('image_three');

  var imagesPerTurn = [];
  var randomIndex;

  for (var i = 0; i < 3; i++) {
    if (i === 1) {
      while (imagesPerTurn.length === 1) {
        randomIndex = generateRandomNumber();
        if (imagesPerTurn[0] !== randomIndex && previousTurnImages[0] !== randomIndex && previousTurnImages[1] !== randomIndex && previousTurnImages[2] !== randomIndex){
          imagesPerTurn.push(randomIndex);
          items[randomIndex].shown += 1;
        }
      }
    } else if (i === 2) {
      while (imagesPerTurn.length === 2) {
        randomIndex = generateRandomNumber();
        if (imagesPerTurn[0] !== randomIndex && imagesPerTurn[1] !== randomIndex && previousTurnImages[0] !== randomIndex && previousTurnImages[1] !== randomIndex && previousTurnImages[2] !== randomIndex){
          imagesPerTurn.push(randomIndex);
          items[randomIndex].shown += 1;
        }
      }
    } else {
      while (imagesPerTurn.length === 0) {
        randomIndex = generateRandomNumber();
        if (previousTurnImages[0] !== randomIndex && previousTurnImages[1] !== randomIndex && previousTurnImages[2] !== randomIndex) {
          imagesPerTurn.push(randomIndex);
          items[randomIndex].shown += 1;
        }
      }
    }
  }


  imageOne.src = items[imagesPerTurn[0]].path;
  imageTwo.src = items[imagesPerTurn[1]].path;
  imageThree.src = items[imagesPerTurn[2]].path;

  previousTurnImages = imagesPerTurn;

  totalTurns.push(imagesPerTurn);

  function generateRandomNumber() {
    return Math.floor(Math.random() * paths.length);
  }
}

function exitClicks(){
  if (numberOfClicks === 25){
    generateDataChart();
    renderChart();
    displayArea.removeEventListener('click', clickHandler);
    return;
  }

}

function generateLabelsChart() {
  for (var i = 0; i < items.length; i++){
    var label = items[i].name;
    labelsChart.push(label);
  }
};

function generateDataChart() {
  for (var i = 0; i < items.length; i++){
    var data = items[i].clicked;
    dataChart.push(data);
  }
};

function storeLocal() {
  var itemsJSON = JSON.stringify(items);
  localStorage.setItem('items', itemsJSON);
};

function retrieveLocal() {//need statement to check to see if items exists in local storage at all
  if (storedItemsString) {
    items = JSON.parse(storedItemsString);
  } else {
    for (var i = 0; i < paths.length; i++) {
      var newItem = new ItemImage(path[i].split('.')[0], paths[i]);
      items. push(newItem);
    }
  }
}

function renderChart() {
  var ctx = document.getElementById('my_chart');
  new Chart(ctx, {
    type: 'bar',
    data:{
      labels:labelsChart,
      datasets: [{
        label: '# of clicks',
        data: dataChart,
        backgroundColor: [
          'rgba(255, 215, 0, 0.2)',
          'rgba(255, 215, 0, 0.2)',
          'rgba(255, 215, 0, 0.2)',
          'rgba(255, 215, 0, 0.2)',
          'rgba(255, 215, 0, 0.2)',
          'rgba(255, 215, 0, 0.2)',
          'rgba(255, 215, 0, 0.2)',
          'rgba(255, 215, 0, 0.2)',
          'rgba(255, 215, 0, 0.2)',
          'rgba(255, 215, 0, 0.2)',
          'rgba(255, 215, 0, 0.2)',
          'rgba(255, 215, 0, 0.2)',
          'rgba(255, 215, 0, 0.2)',
          'rgba(255, 215, 0, 0.2)',
          'rgba(255, 215, 0, 0.2)',
          'rgba(255, 215, 0, 0.2)',
          'rgba(255, 215, 0, 0.2)',
          'rgba(255, 215, 0, 0.2)',
          'rgba(255, 215, 0, 0.2)',
          'rgba(255, 215, 0, 0.2)'
        ],
        borderColor: [
          'rgba(255, 215, 0, 1)',
          'rgba(255, 215, 0, 1)',
          'rgba(255, 215, 0, 1)',
          'rgba(255, 215, 0, 1)',
          'rgba(255, 215, 0, 1)',
          'rgba(255, 215, 0, 1)',
          'rgba(255, 215, 0, 1)',
          'rgba(255, 215, 0, 1)',
          'rgba(255, 215, 0, 1)',
          'rgba(255, 215, 0, 1)',
          'rgba(255, 215, 0, 1)',
          'rgba(255, 215, 0, 1)',
          'rgba(255, 215, 0, 1)',
          'rgba(255, 215, 0, 1)',
          'rgba(255, 215, 0, 1)',
          'rgba(255, 215, 0, 1)',
          'rgba(255, 215, 0, 1)',
          'rgba(255, 215, 0, 1)',
          'rgba(255, 215, 0, 1)',
          'rgba(255, 215, 0, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
