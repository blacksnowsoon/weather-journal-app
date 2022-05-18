// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
const body = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(body.urlencoded({ extended: false }));
app.use(body.json());

// Cors for cross origin allowance
const cors = require('cors');
// const res = require('express/lib/response');
// const req = require('express/lib/request');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 5000;
app.listen(port,listening);
// setting the callback function to the server
function listening(){
  console.log(`server running on localhost: ${port}`);
}

app.post('/add', pushToProjectData );

function pushToProjectData(req,res){
  console.log(req.body);
  const newEntry ={
    temp: req.body.temp,
    date: req.body.date,
    userRes: req.body.userRes
  }
  projectData = newEntry;
}

app.get('/get', retrieveData);

function retrieveData(req,res){
  res.send(projectData);
}

