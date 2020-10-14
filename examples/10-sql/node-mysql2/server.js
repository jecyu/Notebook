const express = require("express");
const app = express();
const config = require("./config.json");
const bodyParser = require("body-parser");

/**
 * Init sequelize.
 */
const Sequelize = require("sequelize"); // Use sequelize fro ORM(Object Relation Mapping)
const sequelize = new Sequelize("todo", "root", "msthink2020", {
  // Refer to the link: https://sequelize.org/master/manual/dialect-specific-things.html.
  dialect: "mysql",
  dialectOption: {},
});
/**
 * Init project model.
 * A model is an abstarction that represents a table in your database.
 */
const Project = sequelize.define("Project", {
  title: { type: Sequelize.STRING, defaultValue: "No title" },
  description: Sequelize.TEXT,
  created: Sequelize.DATE,
});
/**
 * Init task model.
 */
const Task = sequelize.define("Task", {
  title: { type: Sequelize.STRING, defaultValue: "No title" },
});

/**
 * Build Federation.
 */
Task.belongsTo(Project);
Project.hasMany(Task);
// sequelize.sync({ force: true }); // Sync to the database.
sequelize.sync(); // Sync to the database.

// setup app
app.set("view engine", "ejs");
app.set("views", `${__dirname}/views`);
app.set("view options", { layout: false });

/**
 * middleware
 */
app.use(express.static(`${__dirname}/public`)); //  It serves static files and is based on serve-static.
app.use(bodyParser());

// index route
app.get("/", async (req, res, next) => {
  try {
    const models = await Project.findAll();
    const projects = models.map((model) => model.dataValues);
    res.render("index", { projects });
  } catch (err) {
    if (err) return next(err);
  }
});

/**
 * Create project route.
 */
app.post("/projects", async (req, res, next) => {
  try {
    const model = await Project.build(req.body);
    const data = await model.save();
    res.send(data);
  } catch (err) {
    next(err);
  }
});

/**
 * DELETE project route
 */
app.delete("/project/:id", async (req, res, next) => {
  try {
    const project = await Project.findByPk(Number(req.params.id));
    await project.destroy();
    res.send(200);
  } catch (err) {
    next(err);
  }
});

/**
 * Show tasks of the special project.
 */
app.get("/project/:id/tasks", async (req, res, next) => {
  try {
    const project = await Project.findByPk(Number(req.params.id));
    const tasks = await project.getTasks();
    res.render("tasks", { project, tasks });
  } catch (err) {
    next(err);
  }
});

/**
 * Add a new task to the project.
 */
app.post("/project/:id/tasks", async (req, res, next) => {
  try {
    req.body.ProjectId = req.params.id;
    const model = await Task.build(req.body);
    const data = await model.save();
    res.send(data);
  } catch (err) {
    next(err);
  }
});

/**
 * Delete a task.
 */
app.delete("/task/:id", async (req, res, next) => {
  try {
    const task = await Task.findByPk(Number(req.params.id));
    await task.destroy();
    res.send(200);
  } catch (err) {
    next(err);
  }
});

app.listen(3000, () => {
  console.log(" - listening on http://:3000");
});
