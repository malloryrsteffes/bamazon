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

// VIEW PRODUCTS ===================================================
function viewProducts() {

    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // Log all results' ids, names and prices
        console.log("Pulling up all products now...");
        console.table(res);
        managerStart();
    })
}

// VIEW LOW INVENTORY ===================================================
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

// ADD INVENTORY ===================================================
function addToInventory() {

    // Pull up all items so manager can see
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
                    ], function (err, res) {
                        if (err) throw err;
                        console.log("New inventory added!");
                        console.table(res);
                        managerStart();

                    })
            })

    })
}

// ADD NEW PRODUCT ===================================================
function newProduct() {
    inquirer.prompt([{
        name: "action",
        type: "input",
        message: "Please enter the name of the item.",
    },
    {
        name: "department",
        type: "input",
        message: "Please enter the department for this item."
    },
    {
        name: "price",
        type: "input",
        message: "Please enter the price of this item."
    },
    {
        name: "stock",
        type: "input",
        message: "Please enter the starting stock for this item."
    },
    ])
        .then(function (answer) {
            console.log("Inserting a new product...\n");
            var query = connection.query(
                "INSERT INTO products SET ?",
                {
                    product_name: answer.action,
                    department_name: answer.department,
                    price: answer.price,
                    stock_quantity: answer.stock
                },
                function (err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + " product inserted!\n");
                    managerStart();

                }
            )
        })
}