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
function start(){
    console.log("Loading all products...");
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        // Log all results' ids, names and prices
        for (i = 0; i < res.length; i++){
            console.log(res[i].item_id + " | Product: " 
            + res[i].product_name + " | $" + res[i].price);
        }
        connection.end();
      });
}

start();