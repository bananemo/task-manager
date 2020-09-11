const express = require('express')
require('./db/mongoose') // 執行 mongoose.js 裡面的東西 (connect to db)
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT

app.use(express.json()) // 這個設定能讓進來的 request 自動被 parse 成 json，讓我們在 request handler access
app.use(userRouter) // 向 Express 註冊我們在別的檔案('./routers/user')宣告的 router
app.use(taskRouter)

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})
