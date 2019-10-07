# Project Title

Bamazon is an Amazon-like app, built with mySQL. The app can take in orders from customers and deplete stock from the store's inventory. Bamazon also offers manager-side options, including updating and adding products, as well as viewing items with low inventory.


### Prerequisites

Users will need an SQL client and a database administration tool. I used DBeaver.

In addition, users will need access to a source-code editor such as VSCode, as well as the NPM packages mySQL and Inquirer.

### NPM Installation

```
npm i mysql
```

```
npm i inquirer
```

## How Bamazon Customer Works

Bamazon customers will be greeted by a list of all available products. They will be prompted to enter the id and quantity of the item they would like to purchase. 

Once they complete their order, the program will inform the customer of their successful purchase. More importantly, it will update the stock quantity of the product in the database.

If the customer attempts to buy more of the item than the program has in stock, Bamazon will not allow the transaction to complete.

## How Bamazon Manager Works

Bamazon Manager offers several different options for database management. Managers can view all products or view products with specifically low inventory. They can also update stock quantity and add completely new products to the database. 

## The Code

### Bamazon Customer

Bamazon Customer is fairly straightforward - the real magic goes on behind the scenes. Bamazon uses Inquirer to grab the item's ID, as well as the amount the customer would like to purchase. Those pieces of data are matched to the item in the database, and its stock is updated accordingly.

```Javascript
.then(function (answer) {

var idAnswer = answer.IDSearch;
var quantity = answer.quantity

// Grab the item that matches the requested ID 
connection.query("SELECT item_id, product_name, price, stock_quantity FROM products WHERE item_id =?",
[idAnswer], function (err, res) {
if (err) throw err;

// If the requested quantity is less than what we have in stock
if (quantity < res[0].stock_quantity) {

var updatedStock = res[0].stock_quantity - quantity;
connection.query("UPDATE products SET stock_quantity=? WHERE item_id= ?", [updatedStock, idAnswer])

console.log("Your purchase was successful! Your order total is $" + (quantity * res[0].price));
```

### Bamazon Manager

Bamazon manager features a few useful options for managing the database. After the manager selects which option they'd like to do, a switch statement determines the function that runs.

```Javascript
switch (answer.action) {
    case "View Products for Sale":
        viewProducts();
        break;

    case "View Low Inventory":
        viewLowInventory();
        break;

    case "Add to Inventory":
        addToInventory();
        break;

    case "Add a New Product":
        newProduct();
        break;

    case "Exit":
        connection.end();
        break;
}
```

Low inventory is determined by using the WHERE clause in mySQL.

```Javascript
function viewLowInventory() {
    // Order by lowest first
    connection.query("SELECT * FROM products WHERE (stock_quantity < 2000) ORDER BY stock_quantity ASC", function (err, res) {
        if (err) throw err;
        // Log all results' ids, names and prices
        console.log("Pulling up low-inventory products now...");
        console.table(res);
        managerStart();
    })
}
```

Inquirer is used for both the addtoInventory() function and the newProduct() function.

```Javascript

inquirer.prompt([{
name: "action",
type: "input",
message: "Please enter the ID of the item.",
},
{
name: "quantity",
type: "number",
message: "How many units are you adding?"
}])
.then(function (answer) {
    var idAnswer = answer.action;
    var updatedStock = answer.quantity + res[0].stock_quantity;

    connection.query("UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: updatedStock
            },
            {
                item_id: idAnswer
            }
        ],
```

## Bamazon in Action


### Bamazon Customer

![Bamazon Customer Example](https://media.giphy.com/media/JSYe6V1yotbNYXz1Xo/giphy.gif)

### Bamazon Manager


![Bamazon Manager Low Inventory Example](https://media.giphy.com/media/Rh61J7eLlAzWbaZcUa/giphy.gif)


![Bamazon Manager Stock Add Example](https://media.giphy.com/media/S53KI7GZF9Y6iTHEyT/giphy.gif)


![Bamazon Manager New Product Example](https://media.giphy.com/media/STT90aK4N9nEEY8PIH/giphy.gif)


## Built With

* [DBeaver](https://dbeaver.io) - Database
* [mySQL](https://dev.mysql.com/downloads/) - Relational database management system

 

## Authors

* **Mallory Steffes** - [Github](https://github.com/malloryrsteffes)


## Acknowledgments

* The TAs at UCF!
* Sid for the database update help!

