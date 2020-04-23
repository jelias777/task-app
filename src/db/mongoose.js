const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

//Validator docs: https://mongoosejs.com/docs/validation.html
const User = mongoose.model('User', {
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        validate(value) {
            if(value < 0) {
                throw new Error('Age must be greater than 0')
            }
        }
    }
})

const usr = new User({
    name: 'Carlos',
    age: -1
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