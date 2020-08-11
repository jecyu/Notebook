const mysql = require("mysql2");
const config = require("./config.json");

/**
 * init db client
 */
delete config.database;
const db = mysql.createConnection(config);
db.query("CREATE DATABASE IF NOT EXISTS `cart-example`");
db.query("USE `cart-example`");
db.query("DROP TABLE IF EXISTS item");
db.query(`CREATE TABLE item (
          id INT(11) AUTO_INCREMENT, 
          title VARCHAR(255), 
          description TEXT,
          PRIMARY KEY (id))`);
db.query("DROP TABLE IF EXISTS review");
db.query(`CREATE TABLE review (
          id INT(11) AUTO_INCREMENT, 
          item_id INT(11), 
          text TEXT,
          stars INT(1), 
          created DATETIME, 
          PRIMARY KEY (id)
          )`);
db.end();
