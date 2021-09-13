const jwt = require('jsonwebtoken')
const User = require('../../models/user')

const auth = async (req, res, next) => { // request 會先進到這邊，做一些自己定義的行為之後，呼叫 next() 才會去做 router handler
    try {

        // Find the user by token
        // User 會在 request 的 header 的 Authorization param 裡面放 token，所以要從裡面撈出來
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user // 把找到的 user 存在 request 裡面，這樣 router handler 就能 access 到找到的 user，之後就不用再 fetch 一次 user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth