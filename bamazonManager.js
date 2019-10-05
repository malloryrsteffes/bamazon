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

connection.connect(function (err) {
    if (err) throw err;
    managerStart();
});

// Prompt for manager and following switch statement depending on their choice
function managerStart() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add a New Product",
                "Exit"
            ]
        })
        .then(function (answer) {
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
        });
}

// View Products

function viewProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // Log all results' ids, names and prices
        console.log("Pulling up all products now...");
        console.table(res);
        managerStart();
    })
}

// View products with low inventory. Order by lowest first
function viewLowInventory() {
    connection.query("SELECT * FROM products WHERE (stock_quantity < 2000) ORDER BY stock_quantity ASC", function (err, res) {
        if (err) throw err;
        // Log all results' ids, names and prices
        console.log("Pulling up low-inventory products now...");
        console.table(res);
        managerStart();
    })
}

function addToInventory() {

    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // Log all results' ids, names and prices
        console.log("Pulling up all products now...");
        console.table(res);


        inquirer.prompt([{
            name: "action",
            type: "input",
            message: "Please enter the ID of the item.",
        },
        {
            name: "quantity",
            type: "input",
            message: "How many units are you adding?"
        }])
            .then(function (answer) {
                var idAnswer = answer.action;
                var updatedStock = answer.quantity;

                // Not working yet. Can't get the updatedStock to add to the currently existing stock.
                connection.query("UPDATE products SET stock_quantity=? WHERE item_id=?", [updatedStock, idAnswer], function (err, res) {
                    if (err) throw err;
                    console.log("New inventory added!");
                    console.table(res);
                })
            })
    })
}