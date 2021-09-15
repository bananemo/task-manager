const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router()
const TaskService = require('../../service/task')

module.exports = (app) => {
    app.use("/tasks", router);

    router.post('', auth, async (req, res, next) => {
    
        try {
            const taskService = new TaskService()
            const message = await taskService.create(req.body, req.user._id)

            res.status(201).json({ message })
        } catch (e) {
            console.log('🔥 error: %o',  e );
            return next(e);
        }
    })
    
    // GET /tasks?completed=true
    // GET /tasks?limit=10&skip=20
    // GET /tasks?sortBy=createdAt:desc
    router.get('', auth, async (req, res, next) => {
        try {
            const taskService = new TaskService()
            const message = await taskService.getAll(req.query, req.user)

            res.status(200).json({ message })
        } catch (e) {
            console.log('🔥 error: %o',  e );
            return next(e);
        }
    })
    
    router.get('/:id', auth, async (req, res, next) => {
        try {    
            const taskService = new TaskService()
            const message = await taskService.get(req.params.id, req.user._id)

            return res.status(200).json({ message });
        } catch (e) {
            console.log('🔥 error: %o',  e );
            return next(e);
        }
    })
    
    router.patch('/:id', auth, async (req, res, next) => {
        try {
            const taskService = new TaskService()
            const message = await taskService.update(req.body, req.params.id, req.user._id)

            return res.status(200).json({ message });
        } catch (e) {
            console.log('🔥 error: %o',  e );
            return next(e);
        }
    })
    
    router.delete('/:id', auth, async (req, res, next) => {
        try {
            const taskService = new TaskService()
            const message = await taskService.delete(req.params.id, req.user._id)

            return res.status(200).json({ message });
        } catch (e) {
            console.log('🔥 error: %o',  e );
            return next(e);
        }
    })
}