'use-strict'

const express = require('express')
const router = express.Router()

const taskRouter = require('../controller/master/taskController');

let routes = app => {
    //Task Detail 
    router.post('/api/createTask', taskRouter.createTaskDetail)
    router.get('/api/getAllTask', taskRouter.getAlltaskDetail)
    router.get('/api/getTaskById/:id', taskRouter.singletaskDetail)
    router.put('/api/updateTask/:id', taskRouter.updatetaskDetail)
    router.delete('/api/deleteTask/:id', taskRouter.deletetaskDetail)


    return app.use('/', router)
}

module.exports = routes