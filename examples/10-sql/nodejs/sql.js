/*
 * @Description:
 * @Author: Jecyu
 * @Date: 2020-08-01 17:47:36
 * @LastEditTime: 2020-08-01 18:15:43
 * @LastEditors: Jecyu
 */

"use strict";

const mysql = require("mysql2"); // mysql driver

const config = {
  host: "localhost",
  user: "root",
  password: "msthink2020",
  database: "test",
};

// Create the connection pool.
const pool = mysql.createPool(config).promise();
console.log("pool =>", pool);

async function main() {
  try {
    let rows, fields, results;
    [rows, fields] = await pool.query(
      "SELECT * FROM students WHERE score >= ?",
      80
    );

    for (let row of rows) {
      console.log(row);
    }

    [results, fields] = await pool.execute("UPDATE students SET score = score - 5 WHERE score > ? AND score < ?", [80, 90]);
    console.log(`${results.changedRows} records are updated.`);

    pool.end();
  } catch (err) {
    console.log(err);
  }
}

main();
