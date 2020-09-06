const express = require("express");
const app = express();
const mysql = require("mysql2");
const config = require("./config.json");
const bodyParser = require("body-parser");

// connect MySQL
const pool = mysql.createPool(config).promise();

// setup app
app.set("view engine", "ejs");
app.set("views", `${__dirname}/views`);
app.set("view options", { layout: false });

/**
 * middleware
 */
app.use(bodyParser());

// index route
app.get("/", async (req, res, next) => {
  try {
    const [rows, fields] = await pool.query("SELECT * FROM item");
    // console.log("rows =>", rows);
    res.render("index", { items: rows });
  } catch (err) {
    if (err) return next(err);
  }
});

// create product
app.post("/create", async (req, res, next) => {
  console.log(req.body);
  try {
    const info = await pool.query(
      "INSERT INTO item SET title = ?, description = ?",
      [req.body.title, req.body.description]
    );
    console.log(" - item created with id %s", info);
    res.redirect("/");
  } catch (err) {
    if (err) return next(err);
  }
});

// check product
app.get("/item/:id", async (req, res, next) => {
  async function getItem(fn) {
    try {
      console.log(req.params);
      const [
        rows,
        fields,
      ] = await pool.query(
        "SELECT id, title, description FROM item WHERE id = ? LIMIT 1",
        [req.params.id]
      );
      console.log("rows =>", rows);
      if (!rows[0]) return res.status(404).send(`Sorry, can\'t find.`);
      fn(rows[0]);
    } catch (err) {
      if (err) return next(err);
    }
  }

  async function getReviews(item_id, fn) {
    try {
      const [
        rows,
        fields,
      ] = await pool.query(`SELECT text, stars FROM review WHERE item_id = ?`, [
        item_id,
      ]);
      fn(rows);
    } catch (err) {
      if (err) return next(err);
    }
  }

  getItem((item) => {
    getReviews(item.id, (reviews) => {
      res.render("item", {
        item,
        reviews,
      });
    });
  });
});

// create product review
app.post("/item/:id/review", async (req, res, next) => {
  try {
    const info = await pool.query(
      `INSERT INTO review SET item_id = ?, stars = ?, text = ?`,
      [req.params.id, req.body.stars, req.body.text]
    );
    console.log(" - review created with id %s", info);
    res.redirect(`/item/${req.params.id}`);
  } catch (err) {
    if (err) return next(err);
  }
});

app.listen(5000, () => {
  console.log(" - listening on http://:5000");
});
