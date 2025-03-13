import express from "express";
import hbs from "hbs";
import path from "path";
import { fileURLToPath } from "url";

import {weatherData} from "../utils/weatherData.js";


const app = express();




const port = process.env.PORT || 3000


const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const publicStaticDirPath = path.join(__dirname, '../public')

const viewsPath = path.join(__dirname, '../templates/views');

const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicStaticDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App'
    })
})

//localhost:3000/weather?address=lahore
app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address) {
        return res.send({
            error: "You must enter address in search text box"
        })
    }

    weatherData(address, (error, {temperature, description, cityName} = {}) => {
        if(error) {
            return res.send({
                error
            })
        }
        console.log(temperature, description, cityName);
        res.send({
            temperature,
            description,
            cityName
        })
    })
});

app.get("*", (req, res) => {
    res.render('404', {
        title: "page not found"
    })
})


app.listen(port, () => {
    console.log("Server is up and running on port: ", port);
})