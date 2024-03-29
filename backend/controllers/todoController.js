const Todo = require('../models/todo')
const mongoose = require('mongoose')

const get_alltodos = (req, res) => { 
  Todo.find().sort({ createdAt: -1 })
  .then(result => {
    res.status(200).json(result)
  })
  .catch(err => {
    console.log(err)
  })
}

const post_newtodo = (req, res) => {
  const todo = new Todo(req.body)

  todo.save()
  .then(result => {
    res.status(200).json(result)
  })
  .catch(err => {
    res.status(400).json({ error: err.message })
  })
}

const delete_todo = (req, res) => {
  const id = req.params.id

  Todo.findByIdAndDelete(id)
  .then(result => {
    if(result) {
      res.json({ msg: 'Task has been successfully deleted.' })
    }
  })
  .catch(err => {
    console.log(err);
  })
}

module.exports = {
  get_alltodos, 
  post_newtodo,
  delete_todo
}