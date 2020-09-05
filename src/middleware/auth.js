const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => { // request 會先進到這邊，做一些自己定義的行為之後，呼叫 next() 才會去做 router handler
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'thisIsMyTokenSecret')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user // 把找到的 user 存在 request 裡面，這樣 router handler 就能 access 到找到的 user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth