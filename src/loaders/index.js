const mongooseLoader = require("./mongoose");
const expressLoader = require("./express");
const dependencyInjectorLoader = require('./dependencyInjector');


const TaskModel = require('../models/task')
const TaskService = require('../service/task')


const loaders = async (expressApp) => {
    await mongooseLoader()

    // Dependency Injection
    const taskModel = {
        name: 'taskModel',
        model: TaskModel,
    };

    const taskService = {
        name: 'taskService',
        service: TaskService,
    }

    const models = [
        taskModel
    ]

    const services = [
        taskService
    ]
    await dependencyInjectorLoader(models, services)



    
    await expressLoader(expressApp)

}

module.exports = loaders