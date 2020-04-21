const mongodb = require('mongodb')

//give access to connect to the DB
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect( connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, ( error, client ) => {

    if(error) {
        console.log('Unable to connect to DB')
    }

    console.log('Connected Correctly')
})