require('reflect-metadata'); // We need this in order to use @Decorators

const express = require('express')
const loaders = require('./loaders')

async function startServer() {

    const app = express() // a variable to store express app
    const port = process.env.PORT // 這個是 deploy 用的，deployment 的環境 (e.g. AWS) 會自己有環境變數，並且會自動提供一個 port，讓我們的 app 去聽

    await loaders(app);

    app.listen(port, () => {
        console.log(`Server is up on port ${port}`)
    })
}

startServer();
