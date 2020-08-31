const express = require('express')
require('./db/mongoose') // 執行 mongoose.js 裡面的東西 (connect to db)
const User = require('./models/user')
const Task = require('./models/task')


const app = express()
const port = process.env.PORT || 3000

app.use(express.json()) // 這個設定能讓進來的 request 自動被 parse 成 json，讓我們在 request handler access

app.post('/users', (req, res) => {
    const user = new User(req.body)

    user.save().then(() => {
        res.status(201).send(user)
    }).catch((e) => {
        res.status(400).send(e) // 先設置 response code, 再 send response msg
    })
})

app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users)
    }).catch((e) => {
        res.status(500).send()
    })
})

app.get('/users/:id', (req, res) => {
    const _id = req.params.id

    User.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    }).catch((e) => {
        res.status(500).send()
    })
})

app.post('/tasks', (req, res) => {
    const task = new Task(req.body)

    task.save().then(() => {
        res.status(201).send(task)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

app.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks)
    }).catch((e) => {
        res.status(500).send()
    })
})

app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id
    console.log(_id)

    Task.findById(_id).then((task) => {
        if (!task) {
            return req.status(404).send()
        }

        res.send(task)
    }).catch((e) => {
        res.status(500).send()
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})

