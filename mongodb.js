//MongoClient :give access to connect to the DB
//ObjectID: allows you to create your own IDs
//import with destructuring
const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

//connect to server
MongoClient.connect( connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, ( error, client ) => {

    if(error) {
        console.log('Unable to connect to DB')
    }

    //get the connection to specific DB
    const db = client.db(databaseName)

    //findOne: if query matches, first document is returned, otherwise null
    //Search by name
    db.collection('users').findOne({ name: 'Elias' }, ( error, user ) => {

        if(error) {
           return console.log('Unable to fetch') 
        }

        console.log(user)
    })

    //Search by ID, need to convert to object
    db.collection('users').findOne({ _id: new ObjectID('5e9f42046b2921480868b140') }, ( error, user ) => {

        if(error) {
           return console.log('Unable to fetch') 
        }

        console.log(user)
    })

    //find: nomatter number of documents matched, a cursor is returned, never null
    //Array of elements
    db.collection('users').find( { age: 26 } ).toArray( ( error, users ) => {

        if(error) {
           return console.log('Unable to fetch') 
        }

        console.log(users)
    })

    //count the total of elements
    db.collection('users').find( { age: 26 } ).count( ( error, count ) => {

        if(error) {
           return console.log('Unable to fetch') 
        }

        console.log(count)
    })

    
})