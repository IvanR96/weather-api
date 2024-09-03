import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
// Define your API key as a constant
//const API_KEY = 'f56f8d2631b45cd9bd5791cb953a3115';

// main url http://api.openweathermap.org/data/2.5/weather?lat=51.5074&lon=-0.1278&appid=f56f8d2631b45cd9bd5791cb953a3115

// Define the base URL as a constant
const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';


// Combine everything to create the full URL
//const FULL_URL = `${BASE_URL}?q=${CITY_NAME}&appid=${API_KEY}`;

// Now you can use FULL_URL to make your API request
//console.log(FULL_URL);

app.use(express.static('public'));

app.get("/", (req,res)=>{
    res.render("index.ejs");
})

app.listen(port, ()=>{
    console.log(`Server running on port ${port}...`);
});