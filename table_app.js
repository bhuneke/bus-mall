'use strict';

var storedItemsString = localStorage.getItem('items');
var items = JSON.parse(storedItemsString);


function renderTable(){

  for (var i = 0; i < items.length; i++) {
    var itemsTable = document.getElementById('items_table');
    var tableRow = document.createElement('tr');
    var itemName = document.createElement('th');
    var itemViews = document.createElement('td');
    var itemClicks = document.createElement('td');
    var itemPercentage = document.createElement('td');
    var itemRecommendation = document.createElement('td');

    itemName.textContent = items[i].name;
    itemViews.textContent = items[i].shown;
    itemClicks.textContent = items[i].clicked;
    itemPercentage.textContent = items[i].percentage;
    itemRecommendation.textContent = items[i].recommendation;
    tableRow.appendChild(itemName);
    tableRow.appendChild(itemViews);
    tableRow.appendChild(itemClicks);
    tableRow.appendChild(itemPercentage);
    tableRow.appendChild(itemRecommendation);

    itemsTable.appendChild(tableRow);
  }
}

renderTable();
