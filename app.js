'use strict';

var operationHour = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

var shops = [];

function CookiesShop(name, minCustmoer, maxCustmoer, avgCustomer) {
    this.name = name;
    this.minCustmoer = minCustmoer;
    this.maxCustmoer = maxCustmoer;
    this.avgCustomer = avgCustomer;
    this.customerPerHour = [];
    this.avgCustomerPerHour = [];
    this.total = 0
    shops.push(this);

}

CookiesShop.prototype.randomCustomer = function () {
    for (var i = 0; i < operationHour.length; i++) {
        this.customerPerHour.push(randomNumber(this.minCustmoer, this.maxCustmoer));
    }

}
CookiesShop.prototype.avgCustomerInHour = function () {
    for (var i = 0; i < operationHour.length; i++) {
        this.avgCustomerPerHour.push(Math.floor(this.avgCustomer * this.customerPerHour[i]));
    }

}

CookiesShop.prototype.getTotal = function () {
    for (var i = 0; i < operationHour.length; i++) {
        this.total = this.total + this.avgCustomerPerHour[i];
    }
}

var parentDiv = document.getElementById('main-id');

var newTable = document.createElement('table');
parentDiv.appendChild(newTable);
var FirstRow = document.createElement('tr');
newTable.appendChild(FirstRow);

var firstHeader = document.createElement('th')
FirstRow.appendChild(firstHeader);
firstHeader.textContent = '';

for (var i = 0; i < operationHour.length; i++) {
    var firstHeader = document.createElement('th');
    firstHeader.textContent = operationHour[i];
    FirstRow.appendChild(firstHeader);

}
firstHeader.textContent = 'Total'

CookiesShop.prototype.render = function () {

    var newRow = document.createElement('tr');
    var newColum = document.createElement('td');
    newRow.appendChild(newColum);
    newTable.appendChild(newRow);
    newColum.textContent = this.name;

    for (var i = 0; i < operationHour.length; i++) {
        var avgColoum = document.createElement('td');
        avgColoum.textContent = this.avgCustomerPerHour[i];
        newRow.appendChild(avgColoum);
    }

    var totalColum = document.createElement('td');
    totalColum.textContent = this.total;
    newRow.appendChild(totalColum);

}


var Seattle = new CookiesShop('Seattle', 23, 65, 6.3);
Seattle.randomCustomer();
Seattle.avgCustomerInHour();
Seattle.getTotal();
Seattle.render();

var Tokyo = new CookiesShop('Tokyo', 3, 24, 1.2);
Tokyo.randomCustomer();
Tokyo.avgCustomerInHour();
Tokyo.getTotal();
Tokyo.render();


var Dubai = new CookiesShop('Dubai', 11, 38, 3.7);
Dubai.randomCustomer();
Dubai.avgCustomerInHour();
Dubai.getTotal();
Dubai.render();


var Paris = new CookiesShop('Paris', 20, 38, 2.3);
Paris.randomCustomer();
Paris.avgCustomerInHour();
Paris.getTotal();
Paris.render();


var Lima = new CookiesShop('Lima', 2, 16, 4.6);
Lima.randomCustomer();
Lima.avgCustomerInHour();
Lima.getTotal();
Lima.render();



var TotalFinalRow;
var lastRow ;

function createLastRow() {
    var arrayForTotal = [];
    for (var i = 0; i < operationHour.length; i++) {
        
        var grandTotalRow = 0;

        for (var x = 0; x < shops.length; x++) {
            grandTotalRow = grandTotalRow + shops[x].avgCustomerPerHour[i];

        }
        arrayForTotal.push(grandTotalRow);
    }

      lastRow = document.createElement('tfoot');
    newTable.appendChild(lastRow);

    var lastColum = document.createElement('td');
    lastColum.textContent='Total';
    lastRow.appendChild(lastColum);

    var lastColumTotal ;
    for (var i = 0 ; i<operationHour.length ; i++){
       lastColumTotal = document.createElement('td');
       lastColumTotal.textContent=arrayForTotal[i];
       lastRow.appendChild(lastColumTotal);
    }
    var totalOfRow=0;
    for (var i=0 ; i<operationHour.length ; i++){
        totalOfRow = totalOfRow + arrayForTotal[i];
        
    }

    var finaltotalOfRowIn = document.createComment('td');
    finaltotalOfRowIn.textContent = totalOfRow;
    lastRow.appendChild(finaltotalOfRowIn);
    
}

createLastRow();


// create form 

var createForm = document.getElementById('newForm');

createForm.addEventListener('submit',addInfo)

function addInfo(event) {
    event.preventDefault ()

    var name=event.target.name.value;

    var minCustmoerForm = event.target.minOfCustomer.value;

    var maxCustmoerForm = event.target.maxOfCustomer.value;

    var avgCustomerFrom = event.target.avgOfCustomer.value;

    if (minCustmoerForm>minCustmoerForm){
        alert('The min of customers must be less than max of customers');
    }else {
        lastRow.innerHTML = " ";

        var newShop = new CookiesShop(name, parseInt(minCustmoerForm), parseInt(maxCustmoerForm), parseInt(avgCustomerFrom));
        newShop.randomCustomer();
        newShop.avgCustomerInHour();
        newShop.getTotal();
        newShop.render();
        createLastRow();

    }
    
}





