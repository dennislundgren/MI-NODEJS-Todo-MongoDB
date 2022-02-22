//////////////
// IMPORTS //
////////////
const express = require("express");
const fs = require("fs");
const xss = require("xss");
const classes = require("../modules/_Classes");
const functions = require("../modules/_Functions");
const getDb = require("../database");
const { ObjectId } = require("mongodb");
///////////
// INIT //
/////////
const router = express.Router();
const filter = {
  whiteList: [],
  stripIgnoreTag: true,
  stripIgnoreBody: ["script"],
};
const DB_NAME = "mi-nodejs-todo";
const COLLECTION_NAME = "todolist";
/////////////
// ROUTES //
///////////
router.get("/", async (req, res) => {
  const db = await getDb(DB_NAME);
  const dbTodolist = db.collection(COLLECTION_NAME).find();

  const todoList = [];

  await dbTodolist.forEach((todo) => {
    todoList.push(todo);
  });

  res.render("todo", { todoList });
}); // Todo-list
router.get("/done", async (req, res) => {
  const db = await getDb(DB_NAME);
  const dbTodolist = db.collection(COLLECTION_NAME).find();

  const todoList = [];

  await dbTodolist.forEach((todo) => {
    todoList.push(todo);
  });

  if (todoList.length > 0) {
    res.render("todo-done", { todoList });
  } else {
    res.redirect("/todo");
  }
}); // Todo-list done
router.get("/ongoing", async (req, res) => {
  const db = await getDb(DB_NAME);
  const dbTodolist = db.collection(COLLECTION_NAME).find();

  const todoList = [];

  await dbTodolist.forEach((todo) => {
    todoList.push(todo);
  });
  if (todoList.length > 0) {
    res.render("todo-ongoing", { todoList });
  } else {
    res.redirect("/todo");
  }
}); // Todo-list ongoing
router.get("/newest", async (req, res) => {
  const db = await getDb(DB_NAME);
  const dbTodolist = db.collection(COLLECTION_NAME).find();

  const todoList = [];

  await dbTodolist.forEach((todo) => {
    todoList.push(todo);
  });
  if (todoList.length > 0) {
    todoList.sort((a, b) => {
      return b.created.timestamp - a.created.timestamp;
    });
    res.render("todo-newest", { todoList });
  } else {
    res.redirect("/todo");
  }
}); // Todo-list newest
router.get("/oldest", async (req, res) => {
  const db = await getDb(DB_NAME);
  const dbTodolist = db.collection(COLLECTION_NAME).find();

  const todoList = [];

  await dbTodolist.forEach((todo) => {
    todoList.push(todo);
  });
  if (todoList.length > 0) {
    todoList.sort((a, b) => {
      return a.created.timestamp - b.created.timestamp;
    });
    res.render("todo-oldest", { todoList });
  } else {
    res.redirect("/todo");
  }
}); // Todo-list oldest
router.get("/create", (req, res) => {
  res.render("todo-create");
}); // Create new todo (GET)
router.post("/create", async (req, res) => {
  const db = await getDb(DB_NAME);
  const description = xss(req.body.description, filter);
  const newTodo = new classes.Todo(description, false);
  await db.collection(COLLECTION_NAME).insertOne(newTodo);
  res.redirect("/todo");
}); // Creates new todo (POST)
router.get("/change/:id", async (req, res) => {
  const db = await getDb(DB_NAME);
  const dbTodo = db
    .collection(COLLECTION_NAME)
    .findOne({ _id: ObjectId(req.params.id) });

  res.render("todo-change", await dbTodo);
}); // Change description (GET)
router.post("/change/:id", async (req, res) => {
  const db = await getDb(DB_NAME);
  try {
    db.collection(COLLECTION_NAME).updateOne(
      { _id: ObjectId(req.params.id) },
      {
        $set: {
          description: xss(req.body.description, filter),
          changed: functions.getNewDate(),
        },
      }
    );
  } catch (error) {
    console.log(error);
  }

  res.redirect("/todo");
}); // Change description (POST)
router.get("/done/:id/:from", async (req, res) => {
  const db = await getDb(DB_NAME);
  const object = await db
    .collection(COLLECTION_NAME)
    .findOne({ _id: ObjectId(req.params.id) });

  if (object.done) {
    try {
      db.collection(COLLECTION_NAME).updateOne(
        { _id: ObjectId(req.params.id) },
        { $set: { done: false } }
      );
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      db.collection(COLLECTION_NAME).updateOne(
        { _id: ObjectId(req.params.id) },
        { $set: { done: true } }
      );
    } catch (error) {
      console.log(error);
    }
  }

  const from = req.params.from;

  if (from == "todo") res.redirect("/todo");
  else res.redirect(`/todo/${from}`);
}); // Done
router.get("/delete/:id", async (req, res) => {
  const db = await getDb(DB_NAME);
  try {
    db.collection(COLLECTION_NAME).deleteOne({ _id: ObjectId(req.params.id) });
  } catch (error) {
    console.log(error);
  }

  res.redirect("/todo");
}); // Deletes todo
//////////////
// EXPORTS //
////////////
module.exports = router;
