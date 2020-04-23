const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

//Validator docs: https://mongoosejs.com/docs/validation.html
const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
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
            if(value < 0) {
                throw new Error('Age must be greater than 0')
            }
        }
    }
})

const usr = new User({
    name: ' Elias ',
    email: 'jelias@test.com'
})

usr.save().then((usr) => {
    console.log(usr)
}).catch((error) => {
    console.log('Error: ' , error)
})

/*const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
})

const task = new Task({
    description: 'Learn the Mongoose Library',
    completed: false
})

task.save().then(() => {
    console.log(task)
}).catch((error) => {
    console.log('Error: ' , error)
})*/