//mongodb npm library
const mongodb = require('mongodb')

//give access to connect to the DB
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

//connect to server
MongoClient.connect( connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, ( error, client ) => {

    if(error) {
        console.log('Unable to connect to DB')
    }

    //get the connection to specific DB
    const db = client.db(databaseName)

    //insert document
    // Add a callback function to verify if insert was correctly
    db.collection('users').insertOne({
        name: 'Jorge',
        age: 26
    }, (error, result) => {

        if( error ) {
            return console.log('Unable to insert user')
        }

        //ops: is an array with Documents
        console.log(result.ops)

    })
})