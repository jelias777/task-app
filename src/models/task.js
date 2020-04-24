const mongoose = require('mongoose')

//Validator docs: https://mongoosejs.com/docs/validation.html
const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = Task