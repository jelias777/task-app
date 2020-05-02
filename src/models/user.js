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
        required: true,
        trim: true,
        unique: true,
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
            if(value < 0) {
                throw new Error('Age must be greater than 0')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true,
        validate(pwd) {
            if (pwd.toLowerCase().includes('password')) {
                throw new Error('Password is not valid, cannot contain "password"')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    profile_image: {
        type: Buffer
    }
},{
    timestamps: true
})

//virtual property (name, object)
//ref is the reference to the model
//localfield and foreignfield are the relation betweenthe models
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'user_id'
})

//overwrite toJSON
//Is used to remove data that is send to the client
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.profile_image

    return userObject
}

//this method is used to generate the token
//use of methods means that is part of the instance
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)

    //Save the token to the user
    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

//This method find the user by email, and validate the password to login
//Use static means that is part ob the object
userSchema.statics.findByCredencials = async (email, password) => {
    const user = await User.findOne({ email })

    if(!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

//Hash the plain text password before saving
//.pre is used to be ejecuted before is saved in the DB
userSchema.pre('save', async function (next) {
    
    const user = this

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

//Using middleware to delete all the tasks related to the user
userSchema.pre('remove', async function (next) {

    const user = this
    await Task.deleteMany({ user_id: user._id })
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User