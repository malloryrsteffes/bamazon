DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(255) NOT NULL,
  department_name VARCHAR(255) NOT NULL,
  price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (id)
);

-- populate the database --

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("InstaPot Pressure Cooker", "Household Appliances", 100, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Yoga Mat", "Health and Fitness", 30, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhone X", "Electronics", 900, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Yeti Mug", "Outdoor Supplies", 30, 600);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Acer Nitro Laptop", "Electronics", 800, 400);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Muscle Milk Protein Powder", "Health and Fitness", 40, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Stainless Steel Straws", "Household Appliances", 15, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Socks", "Clothing", 20, 800);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sharpies", "Office Supplies", 15, 750);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Binder Clips", "Office Supplies", 20, 600);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cliff Bars", "Groceries", 18, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Maybelline Mascara", "Makeup and Beauty", 20, 300);