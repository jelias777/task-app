const express = require('express')

const app = express()
const port = process.env.PORT || 3000

//automatic parse the request to json
app.use(express.json())

app.post('/users', (req, res) => {
    console.log(req.body)
    res.send('testing')
})

app.listen(port, () => {
    console.log('Server is up and running on port ' + port)
})