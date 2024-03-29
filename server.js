// Global variable
let projectData = {};

// Set up require
const fetch = require("node-fetch");
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 8084;
const server = app.listen(port, listening);
//The listening argument refers to a callback function we create.
function listening() {
  console.log(`running on localhost: ${port}`);
  console.log(`You api key is ${process.env.MY_KEY}`);
}

//post method route
app.post("/", function (req, res) {
  let data = req.body;
  projectData = {
    feeling: data.feeling,
    zip: data.zip,
  };
  console.log("post request", projectData);
  res.send(projectData);
});

//get method route
app.get("/getWeather", async function (req, res) {
  const weatherPromise = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?zip=${projectData.zip},&appid=${process.env.MY_KEY}`
  );
  console.log("Get route response", res);

  try {
    const weatherData = await weatherPromise.json();
    console.log("This is weather Data", weatherData);
    res.send(weatherData);
  } catch (error) {
    console.log("You have en error", error);
  }
});
