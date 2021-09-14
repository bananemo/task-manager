const express = require('express')

const user = require('./routers/user')
const task = require('./routers/task')

module.exports = () => {
    const app = new express.Router()
    
    user(app)
    task(app)

    return app
}