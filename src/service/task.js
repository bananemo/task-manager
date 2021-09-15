const Task = require('../models/task')

const TaskService = class {
    constructor() {
        this.taskModel = Task
    }

    async create(taskInfo, userId) {
        const task = new Task({
            ...taskInfo,
            owner: userId
        })
        
        await task.save()

        return task
    }

    async getAll(query, user) {
        const match = {}
        const sort = {}
    
        if (query.completed) {
            match.completed = (query.completed === 'true')
        }
    
        if (query.sortBy) {
            const parts = query.sortBy.split(':')
            sort[parts[0]] = (parts[1] === 'desc' ? -1 : 1) // 1: ascending, -1: descending
        }


        await user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(query.limit), // If limit is not provided, 這邊的會被忽略
                skip: parseInt(query.skip),
                sort
            }
        }).execPopulate()

        return user.tasks

    }

    async get(taskId, userId) {
        const task = await Task.findOne({ _id: taskId, owner: userId }) // 自己 filter 出被認證的 user 的 id
        if (!task) {
            // console.log('Task not found')
            const err = new Error('Not Found')
            err['status'] = 404;
            // console.log(err.message)
            throw err;
        }

        return task
    }

    async update(updateInfo, taskId, userId) {
        const updates = Object.keys(updateInfo)
        const allowUpdates = ['description', 'completed']
        const isValidOperation = updates.every((update) => allowUpdates.includes(update))
    
        if (!isValidOperation) {
            const err = new Error('Invalid updates!')
            err['status'] = 400;
            throw err;
            // return res.status(400).send({ error: 'Invalid updates!' })
        }

        const task = await Task.findOne({ _id: taskId, owner: userId })
        if (!task) {
            const err = new Error('Not Found')
            err['status'] = 404;
            throw err;
        }
        
        updates.forEach((update) => task[update] = updateInfo[update])
        await task.save()

        return task
    }

    async delete(taskId, userId) {
        const task = await Task.findByIdAndDelete({ _id: taskId, owner: userId }) // 自己 filter 出被認證的 user 的 id

        if (!task) {
            const err = new Error('Not Found')
            err['status'] = 404;
            throw err;
        }

        return task
    }
}

module.exports = TaskService