const express = require('express')
var request = require('request');
const app = express()
const axios = require("axios");
const proxy = require('http-proxy-middleware');

async function query(data,res) {

    axios.post("http://34.16.139.61:3000/api/v1/prediction/862b889c-9750-4fa6-8484-fe5aa3435246", {
      question: data,
     
    })
    .then((response) => {
      //console.log(response);
      res.status(200).json({ data: response.data });
      
    });
    //console.log(result);
/*
    const response = await fetch(
        
        "http://34.16.139.61:3000/api/v1/prediction/862b889c-9750-4fa6-8484-fe5aa3435246",
        {
            method: "POST",
            body: {"question": "Hey, how are you?"}
        }
    );
    const result = {"question": "Hey, how are you?"} //await response.json();
    console.log(result);
    */
   // return result;
}

// Add middleware for http proxying 
const apiProxy = proxy('/', { target: 'http://34.16.139.61:3000' });
app.use('/', apiProxy);

/*
app.all('/', function(req,res) {
    //modify the url in any way you want
    var newurl = 'http://34.16.139.61:3000/api/v1/prediction/862b889c-9750-4fa6-8484-fe5aa3435246';
    request(newurl).pipe(res);
  });
/*
app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo!')
})
*/
/*
app.all('/api/v1/prediction/', (req, res) => {
    console.log("Just got a request!")
    query("eaeee, tudo bem?", res);
    
    query("query").then((response) => {
        res.send(response);
    });
    
    //res.send('Hola API')
})
*/
app.listen(process.env.PORT || 3000)