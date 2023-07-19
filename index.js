const express = require('express')

const app = express()
const axios = require("axios");
const { createProxyMiddleware } = require('http-proxy-middleware');

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration


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
/*
const apiProxy =new proxy('/', { target: 'http://34.16.139.61:3000' });
app.use('/', apiProxy);
*/

//app.use('/', createProxyMiddleware({ target: 'http://34.16.139.61:3000', changeOrigin: true }));
app.use(
"/",
createProxyMiddleware({
  // I have a different port and Visual Studio might randomly change it
  // Fix: edit running configuration 
  // https://stackoverflow.com/questions/70332897/how-to-change-default-port-no-of-my-net-core-6-api

  // Notice: no /api at the end of URL, it will be added.
  // more details at: https://www.npmjs.com/package/http-proxy-middleware
  target: 'http://34.16.139.61:3000',
  changeOrigin: true,

  // Im using .net core 6 starting api template
  // which is running with a self-signed ssl cert with https enabled
  secure: false 
})
);

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