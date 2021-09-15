const express = require('express')
const routes = require('../api')

const expressLoader = (app) => {
    app.use(express.json()) // 這個設定能讓進來的 request 自動被 parse 成 json，讓我們在 request handler access

    // Load API routes
    // 向 Express 註冊我們在別的檔案('./routers/user')宣告的 router，不然 express 不認識這個 router
    app.use(routes());

    
    /// catch 404 and forward to error handler
    app.use((err, req, res, next) => {
        if (err.status == 404) {
            console.log('hello')
            return res.status(err.status).json({ errors: { message: err.message }}).end();
        }
        // const err = new Error('Not Found');
        // err['status'] = 404;
        // next(err);
    });

    /// error handlers
    app.use((err, req, res, next) => {
        /**
         * Handle 401 thrown by express-jwt library
         */
        if (err.name === 'UnauthorizedError') {
        return res
            .status(err.status)
            .send({ message: err.message })
            .end();
        }
        return next(err);
    });
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json({
        errors: {
            message: err.message,
        },
        });

        // if (res.statusCode < 500 && res.statusCode >= 400) {
        //     Logger.warn(err.stack);
        //   } else {
        //     res.status(500);
        //     Logger.error(err.stack);
        //   }
        //   res.json({ error: err.message });
    });
}

module.exports = expressLoader