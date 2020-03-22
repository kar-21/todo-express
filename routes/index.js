var express = require("express");
var router = express.Router();
var Todo = require("../model/todo.schema");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

/* GET all list */
router.get("/todo", async (req, res) => {
  const todo = await Todo.find();
  res.send(todo);
});

/* GET last item */
router.get("/todo/last", async (req, res) => {
  const todo = await Todo.find()
    .sort({ _id: -1 })
    .limit(1);
  res.send(todo);
});

/* POST todo item */
router.post("/todo", async (req, res) => {
  console.log(req.body);
  const todo = new Todo({
    task: req.body.task
  });
  const newTodoList = await todo.save();
  res.status(201).json(newTodoList);
});

/* UPDATE todo item */
router.patch("/todo/:task", async (req, res) => {
  const todo = await Todo.updateOne(
    { task: req.params.task },
    { $set: { task: req.body.task } }
  );
  res.send(todo);
});

/* DELETE todo item */
router.delete("/todo/:task", async (req, res) => {
  const todo = await Todo.findOneAndDelete({ task: req.params.task });
  res.send(todo);
});
module.exports = router;
