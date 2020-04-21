//MongoClient :give access to connect to the DB
//ObjectID: allows you to create your own IDs
//import with destructuring
const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

//doc: https://docs.mongodb.com/manual/reference/method/ObjectId/
/*
Returns a new ObjectId value. The 12-byte ObjectId value consists of:

    a 4-byte timestamp value, representing the ObjectId’s creation, measured in seconds since the Unix epoch
    a 5-byte random value
    a 3-byte incrementing counter, initialized to a random value
*/
const id = new ObjectID()
console.log(id)
console.log(id.getTimestamp())

//compare the lenght of id in binary 12 vs string 14, that´s the reason why mongo store the id in binary
console.log(id.id.length)
console.log(id.toHexString().length)

//connect to server
MongoClient.connect( connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, ( error, client ) => {

    if(error) {
        console.log('Unable to connect to DB')
    }

    //get the connection to specific DB
    const db = client.db(databaseName)

    //insert document
    // Add a callback function to verify if insert was correctly
    db.collection('users').insertOne(
        {
            _id: id,
            name: 'Victor',
            age: 40
        }, ( error, result ) => {

            if( error ) {
                return console.log('Unable to insert user')
            }
    
            //ops: is an array with Documents
            console.log(result.ops)

    })
})