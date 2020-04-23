const mongoose = require('mongoose')
const validator = require('validator')

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
    }
})

module.exports = User