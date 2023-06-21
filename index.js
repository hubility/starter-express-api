const express = require('express')
const app = express()
app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo!')
})
app.all('/api/v1/prediction/862b889c-9750-4fa6-8484-fe5aa3435246', (req, res) => {
    console.log("Just got a request!")
    res.send('Hola API')
})
app.listen(process.env.PORT || 3000)