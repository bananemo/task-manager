const mongoose = require('mongoose')

// Connect to database
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', { // 直接指定 DB
    useNewUrlParser: true,
    useCreateIndex: true, // 讓我們能更快速操作 DB
    useFindAndModify: false
})

