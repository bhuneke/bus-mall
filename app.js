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

var displayArea = document.getElementById('image_area');

for(var i = 0; i < paths.length; i++){
  var newItem = new ItemImage(paths[i].split('.')[0], paths[i]);
  items.push(newItem);
}

generateLabelsChart();

displayArea.addEventListener('click', clickHandler);

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
      randomIndex = generateRandomNumber();
      if (previousTurnImages[0] !== randomIndex && previousTurnImages[1] !== randomIndex && previousTurnImages[2] !== randomIndex) {
        imagesPerTurn.push(randomIndex);
        items[randomIndex].shown += 1;
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
console.log('labelsChart: ' + labelsChart);

function generateDataChart() {
  for (var i = 0; i < items.length; i++){
    var data = items[i].clicked;
    dataChart.push(data);
  }
};
console.log('dataChart: ' + dataChart);


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
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)'
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
