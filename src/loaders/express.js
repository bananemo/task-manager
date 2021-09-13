const express = require('express')
const userRouter = require('../api/routers/user')
const taskRouter = require('../api/routers/task')

const expressLoader = (app) => {
    app.use(express.json()) // 這個設定能讓進來的 request 自動被 parse 成 json，讓我們在 request handler access
    app.use(userRouter) // 向 Express 註冊我們在別的檔案('./routers/user')宣告的 router，不然 express 不認識這個 router
    app.use(taskRouter)
}

module.exports = expressLoader