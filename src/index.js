const express = require('express')
require('./db/mongoose') // 執行 mongoose.js 裡面的東西 (connect to db)
const User = require('./models/user')
const Task = require('./models/task')


const app = express()
const port = process.env.PORT || 3000

app.use(express.json()) // 這個設定能讓進來的 request 自動被 parse 成 json，讓我們在 request handler access


app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})

