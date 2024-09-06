import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
// Define your API key as a constant
const API_KEY = 'f56f8d2631b45cd9bd5791cb953a3115';

// main url http://api.openweathermap.org/data/2.5/weather?lat=51.5074&lon=-0.1278&appid=f56f8d2631b45cd9bd5791cb953a3115

// Define the base URL as a constant
const GEO_BASE_URL = 'http://api.openweathermap.org/geo/1.0/direct';

const WEATHER_URL = 'http://api.openweathermap.org/data/2.5/weather';



// Combine everything to create the full URL
//const FULL_URL = `${BASE_URL}?q=${CITY_NAME}&appid=${API_KEY}`;

// Now you can use FULL_URL to make your API request
//console.log(FULL_URL);

app.use(express.static('public'));

app.get("/", (req,res)=>{
    res.render("index.ejs", {weather: null, error: null});
})

app.post('/weather', async (req, res) => {
    const cityName = req.body.city;
  
    try {
      // Get the coordinates for the city
      const geoResponse = await axios.get(GEO_BASE_URL, {
        params: {
          q: cityName,
          limit: 1,
          appid: API_KEY
        }
      });
  
      if (geoResponse.data.length === 0) {
        res.render('index.ejs', { error: "City not found.", weather: null });
        return;
      }
  
      const { lat, lon } = geoResponse.data[0];
  
      // Get the weather data using the coordinates
      const weatherResponse = await axios.get(WEATHER_URL, {
        params: {
          lat: lat,
          lon: lon,
          appid: API_KEY,
          units: 'metric'
        }
      });
  
      const weatherData = weatherResponse.data;
  
      // Extract current weather and check if it will rain
      const weatherDescription = weatherData.weather[0].description;
      const willRain = weatherData.weather.some(w => w.main.toUpperCase() === 'Rain');
  
      if (willRain) {
        res.render('index.ejs', { weather: `It will rain in ${cityName}. Current weather: ${weatherDescription}`, error: null });
      } else {
        res.render('index.ejs', { weather: `No rain expected in ${cityName}. Current weather: ${weatherDescription}`, error: null });
      }
  
    } catch (error) {
      console.error('Error fetching weather data:', error);
      res.render('index.ejs', { error: "An error occurred while fetching the data.", weather: null });
    }
  });

app.listen(port, ()=>{
    console.log(`Server running on port ${port}...`);
});