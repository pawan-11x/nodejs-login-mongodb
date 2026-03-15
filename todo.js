console.log("Welcome to my database");

const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/todoDB")
.then(() => console.log("MongoDB is Connected"))
.catch(err => console.log(err));

app.listen(5000, () => {
  console.log("Server started on port 5000");
});

const db = new mongoose.Schema({
  title: String,
  complete: {
    type: Boolean,
    default: false
  }
});

const data = mongoose.model("todo", db);

app.get("/alltask", async (req, res) => {
  const tasks = await data.find();
  res.json(tasks);
});

app.post("/create", async (req, res) => {
  const title = req.body.title;
  const complete = req.body.complete;

  const task = new data({
    title,
    complete
  });

  await task.save();
  res.json(task);
});