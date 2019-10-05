var mysql = require("mysql");

var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root1234",
  database: "bamazonDB"
});

//start function
function start() {
  console.log("Loading all products...");
  connection.query("SELECT item_id, product_name, price FROM products", function (err, res) {
    if (err) throw err;
    // Log all results' ids, names and prices
    console.table(res);


    inquirer.prompt([{
      name: "IDSearch",
      type: "input",
      message: "What is the ID of the product would you like to buy?",
    },
    {
      name: "quantity",
      type: "input",
      message: "Please enter how many you would like to purchase."
    }])
      .then(function (answer) {
        var idAnswer = answer.IDSearch;
        var quantity = answer.quantity
        connection.query("SELECT item_id, product_name, price, stock_quantity FROM products WHERE item_id =?",
          [idAnswer], function (err, res) {
            if (err) throw err;

            // If the requested amount is less than what we have in stock
            if (quantity < res[0].stock_quantity) {
              var updatedStock = res[0].stock_quantity - quantity;
              connection.query("UPDATE products SET stock_quantity=? WHERE item_id= ?", [updatedStock, idAnswer])
                
                console.log("Your purchase was successful! Your order total is $" + (quantity * res[0].price));
            }
            // If we don't have enough product to sell.
            else {
              console.log("Sorry! We are short-stocked on this item. We currently have " + res[0].stock_quantity + " available!");
            }

            connection.end();
          })
      })


  });
}

start();