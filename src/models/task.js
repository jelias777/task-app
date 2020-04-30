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
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

module.exports = Task