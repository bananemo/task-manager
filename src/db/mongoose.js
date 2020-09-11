const mongoose = require('mongoose')

// Connect to database
mongoose.connect(process.env.MONGODB_URL, { // 直接指定 DB
    useNewUrlParser: true,
    useCreateIndex: true, // 讓我們能更快速操作 DB
    useFindAndModify: false
})

