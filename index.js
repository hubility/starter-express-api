const express = require('express')
const app = express()

async function query(data) {
    const response = await fetch(
        "http://34.16.139.61:3000/api/v1/prediction/862b889c-9750-4fa6-8484-fe5aa3435246",
        {
            method: "POST",
            body: data
        }
    );
    const result = await response.json();
    console.log(result);
    return result;
}

app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo!')
})
app.all('/api/v1/prediction/862b889c-9750-4fa6-8484-fe5aa3435246', (req, res) => {
    console.log("Just got a request!")
    /*
    query({"question": "Hey, how are you?"}).then((response) => {
        res.send(response);
    });
    */
    res.send('Hola API')
})
app.listen(process.env.PORT || 3000)