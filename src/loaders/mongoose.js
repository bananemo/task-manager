const mongoose = require('mongoose')


const mongooseLoader = async () => {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URL, { // 直接指定 DB
        useNewUrlParser: true,
        useCreateIndex: true, // 讓我們能更快速操作 DB
        useFindAndModify: false
    })
}

module.exports = mongooseLoader