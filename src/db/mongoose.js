const mongoose = require('mongoose')

//Here is the connection to the DB
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})