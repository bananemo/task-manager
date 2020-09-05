const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Invalid password')
            }
        }
    },
    tokens: [{ // 有可能一個使用者從多個裝置登入，所以會有很多個 token
        token: {
            type: String,
            required: true
        }
    }]
})

// 定義和其他 Schema virtual 的 relationship。這邊會在 user 上面建立一個虛擬的 property 叫做 task，但是不會真的存在 user schema 內。這樣就不用額外存 user task
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})


/* methods */

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.methods.generateAuthToken = async function () { // (1) schema.method 能被 instance access; (2) schema.static 能被 model access (想成 object)
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'thisIsMyTokenSecret')// Create a token. 第一個變數放你想要在 token 存的資料，第二個變數放 secret (你加密的東西)，第三個變數可以設定多久過期
    
    user.tokens = user.tokens.concat({ token })
    await user.save()
    
    return token
    //jwt.verify(token, '') // Verify token with secret
}


/* static methods (model methods) */

userSchema.statics.findByCredentials = async (email, password) => { // we can define our own function by setting 'userSchema.statics'; static method 能被 model access
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}



/* middleware */

// Hash the plain text text password before saving 
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) { // when create and update user, isModified will be set true
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

// Delete user tasks when user is removed
userSchema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({ 'owner': user._id })
    next()
})


const User = mongoose.model('User', userSchema)

module.exports = User