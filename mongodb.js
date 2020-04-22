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

    //update(filter, value, callback)
    //In case of not using callback, is changed by a promise like in this example
    //docs: https://docs.mongodb.com/manual/tutorial/update-documents/
    //modifiedCount 1if change
    db.collection('users').updateOne({
        _id: new ObjectID('5e9f3fa8c31fe729f4cba6bf')
    },{
        $set: {
            name: 'Matt'
        }
    }).then((result) => {
        console.log(result.modifiedCount)
    }).catch((error) => {
        console.log(error)
    })

    //Use of $inc
    db.collection('users').updateOne({
        _id: new ObjectID('5e9f3fa8c31fe729f4cba6bf')
    },{
        $inc: {
            age: 4
        }
    }).then((result) => {
        console.log(result.modifiedCount)
    }).catch((error) => {
        console.log(error)
    })
    
})