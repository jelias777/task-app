//callback
const doWorkCallback =  ( callback ) => {

    setTimeout(() => {
        //callback('This is an error', undefined)
        callback(undefined, [1,4,7])
    }, 2000)

}

doWorkCallback((error, result) => {
    if(error) {
        return console.log(error)
    }

    console.log(result)
})

//promise
const doWorkPromise = new Promise((resolve, reject) => {

    setTimeout(() => {
        //reject('This is an error')
        resolve([1,4,7])
    }, 2000)
})

doWorkPromise.then((result) => {
    console.log('Success! ' + result)
}).catch( (error) => {
    console.log('Error ! ' + error)
})