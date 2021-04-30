
class Item {
    constructor(id, itemName, courseType, price) {
        this.id = id;
        this.itemName = itemName;
        this.courseType = courseType;
        this.price = price;
    }
}

let item1 = new Item(1, "Spring Rolls", "starters", 105.00);
let item2 = new Item(2, "French Onion Soup", "starters", 100.00);
let item3 = new Item(3, "Mixed Green Salad", "side dishes", 90.00);
let item4 = new Item(4, "French Fries", "side dishes", 160.00);
let item5 = new Item(5, "Chicken and Mushroom Pie", "main course", 120.00);
let item6 = new Item(6, "Eggplant Lasagne", "main course", 130.00);
let item7 = new Item(7, "Applie Pie with Cream", "dessert", 30.00);
let item8 = new Item(8, "Vanilla Ice Cream", "dessert", 60.00);


let menuItems = []

menuItems.push(item1, item2, item3, item4, item5, item6, item7, item8);

class Table {
    constructor(tableName, items) {
        this.tableName = tableName;
        this.items = items;
    }

    totalPrice() {
        let total = 0;
        let i;
        for (i = 0; i < this.items.length; i++) {
            total += this.items[i].price;
        }
        return total;
    }

    totalItems() {
        return this.items.length;
    }

}

let table1 = new Table("Table-1", []);
let table2 = new Table("Table-2", []);
let table3 = new Table("Table-3", []);

let tableItems = [];
tableItems.push(table1, table2, table3);



let menu = document.querySelector(".menu-items");

for (let i = 0; i < menuItems.length; i++) {
    let card = document.createElement('div');
    card.className = "card item-card shadow p-3 mb-5 bg-white rounded";
    card.id = "item" + (i+1);
    card.draggable = true;
    let title = document.createElement('h5');
    title.className = "card-title";
    title.textContent = menuItems[i].itemName;

    let price = document.createElement('p');
    price.className = "card-text";
    price.textContent = "Price : " + menuItems[i].price;

    card.appendChild(title);
    card.appendChild(price);

    card.ondragstart = function () {
        drag(event, i);
    }

    menu.appendChild(card);
}

let table = document.querySelector(".table-items");

for (let i = 0; i < tableItems.length; i++) {
    let tableCard = document.createElement('div');
    tableCard.className = "card tablecard shadow p-3 mb-5 bg-white rounded";
    
    let tableTitle = document.createElement('h5');
    tableTitle.className = "card-title";
    tableTitle.textContent = tableItems[i].tableName;

    let tableDescription = document.createElement('p');
    tableDescription.className = "card-text";
    tableDescription.id = "table" + i;


    tableCard.appendChild(tableTitle);
    tableCard.appendChild(tableDescription);

    tableCard.ondragover = function () {
        allowDrop(event);
    };

    tableCard.ondrop = function () {
        drop(event, i);
    }

    tableCard.onclick = function(){
        displayTableDetails(i);
    }

    table.appendChild(tableCard);
}




function allowDrop(event) {
    event.preventDefault();
};

function drop(event, tableIndex) {
    event.preventDefault();
    let itemIndex = event.dataTransfer.getData("menuItemIndex");
    let currentTable = tableItems[tableIndex];
    currentTable.items.push(menuItems[itemIndex]);
    let numItems = currentTable.totalItems();
    let bill = currentTable.totalPrice();

    updateTableItemsAndPrice(numItems, bill, tableIndex);
}

function drag(event, menuItemIndex) {
    event.dataTransfer.setData("menuItemIndex", menuItemIndex);
}

function updateTableItemsAndPrice(numItems, bill, tableIndex) {
    let tableId = "table" + tableIndex;
    let tableDescription = document.getElementById(tableId);
    tableDescription.textContent = "Total Price : " + bill 
    + " | " + "No. of Items : " + numItems;
}

function displayTableDetails(tableIndex){
    let currentTable = tableItems[tableIndex];

    let currentTableItems = currentTable.items;

    let tableId = "my-table-form" + (tableIndex+1);

    let tableFormDiv = document.getElementById(tableId);

    let closeButton = document.getElementsByClassName("close")[tableIndex];

    let itemTableId = "items-table" + (tableIndex+1);
    let itemsTable = document.getElementById(itemTableId);

    let tableChildNodes = itemsTable.childNodes;

    let totalBill = 0;

    for(let i=0; i<currentTableItems.length; i++){

        let tableRow = document.createElement('tr');
        tableRow.className="row";

        let itemSno = document.createElement('td');
        itemSno.className = "col-sm-1";
        itemSno.textContent = i+1;

        let itemName = document.createElement('td');
        itemName.className = "col-sm-3";
        itemName.textContent = currentTableItems[i].itemName;

        let itemPrice = document.createElement('td');
        itemPrice.className = "col-sm-3";
        itemPrice.textContent = currentTableItems[i].price;
        totalBill += currentTableItems[i].price; 

        let itemModify = document.createElement('td');
        itemModify.className = "col-sm-3";
        let numOfCurrItem = document.createElement('input');
        numOfCurrItem.type="number";
        numOfCurrItem.defaultValue = "1";
        numOfCurrItem.id = "quantity" + (i+1);
        itemModify.appendChild(numOfCurrItem);
        numOfCurrItem.style.width = "90%";

        let itemDelete = document.createElement('td');
        itemDelete.className = "col-sm-2";
        let deleteButton = document.createElement('button');
        deleteButton.className = "btn btn-success";
        deleteButton.textContent = "Delete";
        deleteButton.style.width = "90%";
        deleteButton.style.height = "90%";
        deleteButton.addEventListener('click', (e) =>{
            itemsTable.removeChild(itemsTable.childNodes[i+2]);
            currentTableItems.splice(i, 1);
            console.log(currentTableItems);
            changeTableData(tableIndex);
            totalBill -= currentTableItems[i].price;
        })
        itemDelete.appendChild(deleteButton);

        tableRow.appendChild(itemSno);
        tableRow.appendChild(itemName);
        tableRow.appendChild(itemPrice);
        tableRow.appendChild(itemModify);
        tableRow.appendChild(itemDelete);

        itemsTable.appendChild(tableRow);
    }
    tableFormDiv.style.display = "block";

    closeButton.onclick = function(){
        tableFormDiv.style.display = "none";
        console.log(tableChildNodes);
        console.log(tableChildNodes.length);
        const tableText = tableChildNodes[0];
        const tbody = (tableChildNodes[1]);
        while(itemsTable.firstChild){
            itemsTable.removeChild(itemsTable.firstChild);
        }
        itemsTable.appendChild(tableText);
        itemsTable.appendChild(tbody);
    }
}

//search for menu items

let menuUl = document.getElementById("menu-ul");

document.getElementById("menu-search").addEventListener('input', (e)=>{

    let menuArray = [];

    if(e.target.value){
        menuArray = menuItems.filter(item => item.itemName.toLowerCase().includes(e.target.value) ||
         item.courseType.toLowerCase().includes(e.target.value));
    }

    menuUl.innerHTML = "";

    showMenuArray(menuArray);
})

function showMenuArray(menuArray){

    for(let i=0; i<menuArray.length; i++){
        let mednuItemDivID = "item" + menuArray[i].id;
        let menuItemCard = document.getElementById(mednuItemDivID);
        let menuLiItemCard = menuItemCard.cloneNode(true);
        let menuLi = document.createElement('li');
        menuLi.appendChild(menuLiItemCard);
        menuUl.appendChild(menuLi);
    }
}


function changeTableData(tableIndex){
    let currentTable = tableItems[tableIndex];
    let numItems = currentTable.totalItems();
    let bill = currentTable.totalPrice();

    updateTableItemsAndPrice(numItems, bill, tableIndex);
}





