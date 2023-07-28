const express = require('express');
const app = express();
const mongoose = require('./database/mongoose')

const TaskList = require('./database/models/taskList')
const Task = require('./database/models/task')

//1st middleware
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*"); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  
app.use(express.json())//2nd middleware body-parser

// CRUD operations for tasklists

//endpoint to get all tasklists
app.get('/tasklists', (req, res) => {
    TaskList.find({})
        .then((lists) => {res.status(200).send(lists)})
        .catch((error) => {
            res.status(500)
            console.log(error)
        })
})

//endpoint to get one tasklist by id
app.get('/tasklists/:taskListId', (req, res)=> {
    let taskListId = req.params.taskListId
    TaskList.find({_id: taskListId})
        .then((taskList) => {res.status(200).send(taskList)})
        .catch((error) => {console.log(error)})
})

//endpoint to create a tasklist
app.post('/tasklists', (req, res) => {
    let taskListObj = { 'title': req.body.title }
    TaskList(taskListObj).save()
        .then((lists) => {res.status(201).send(lists)})
        .catch((error) => {
            res.status(500)
            console.log(error)
        })
})

//update one tasklist object
app.put('/tasklists/:taskListId', (req, res)=>{
    let taskListId = req.params.taskListId
    TaskList.findOneAndUpdate({_id: taskListId}, {$set: req.body}, {new: true})
        .then((taskList) => {res.status(200).send(taskList)})
        .catch((error) => {console.log(error)})
})

//update one field of a tasklist object
app.patch('/tasklists/:taskListId', (req, res)=>{
    let taskListId = req.params.taskListId
    TaskList.findOneAndUpdate({_id: taskListId}, {$set: req.body}, {new: true})
        .then((taskList) => {res.status(200).send(taskList)})
        .catch((error) => {console.log(error)})
})

//delete tasklist object
app.delete('/tasklists/:taskListId', (req, res) => {

    //delete all tasks inside the tasklist
    const deleteAllTasks = (taskList) => {
        Task.deleteMany({_tasklistId: req.params.taskListId})
            .then(() => {return taskList})
            .catch((error) => {console.log(error)})
    }

    const responseTaskList = TaskList.findOneAndDelete({_id: req.params.taskListId})
        .then((taskList) => {deleteAllTasks(taskList)})
        .catch((error) => {console.log(error)})

    res.status(200).send(responseTaskList)
})

//CRUD operations for task where each task belongs to a tasklist

//endpoint to get all the tasks of a tasklist
app.get('/tasklists/:taskListId/tasks', (req, res) => {
    Task.find({_tasklistId: req.params.taskListId})
        .then((tasks) => {res.status(200).send(tasks)})
        .catch((error) => {console.log(error)})
})

//endpoint to get 1 task from a tasklist
app.get('/tasklists/:taskListId/tasks/:taskId', (req, res) => {
    Task.findOne({_tasklistId: req.params.taskListId, _id: req.params.taskId})
        .then((task) => {res.status(200).send(task)})
        .catch((error) => {console.log(error)})
})


//endpoint to create a task
app.post('/tasklists/:taskListId/tasks', (req, res) => {
    let taskObj = { 'title': req.body.title, '_tasklistId': req.params.taskListId, 'completed': req.body.completed }
    Task(taskObj).save()
        .then((task) => {res.status(201).send(task)})
        .catch((error) => {
            res.status(500)
            console.log(error)
        })
})

//update a task from a tasklist
app.patch('/tasklists/:taskListId/tasks/:taskId', (req, res)=>{
    Task.findOneAndUpdate({_tasklistId: req.params.taskListId, _id: req.params.taskId}, {$set: req.body}, {new: true})
        .then((task) => {res.status(200).send(task)})
        .catch((error) => {console.log(error)})
})

//delete a task from a tasklist
app.delete('/tasklists/:taskListId/tasks/:taskId', (req, res)=>{
    Task.findOneAndDelete({_tasklistId: req.params.taskListId, _id: req.params.taskId})
        .then((task) => {res.status(204).send(task)})
        .catch((error) => {console.log(error)})
})

app.listen(3000, ()=>{
    console.log("Server started on port 3000");
}) 