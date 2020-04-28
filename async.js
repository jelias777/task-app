//async functions always return a promise
const doWork = async () => {
    //throw new Error('Something was wrong')
    return "Hello World"
}

doWork().then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})