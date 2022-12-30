const path =require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');
const app = express();

console.log(__dirname)
const publicDirectoryPath = path.join(__dirname, '..' ,'public')
const viewsPath= path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)  
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Bisio'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Bisio'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Bisio',
        message: 'Nothing to see here Move along'
    })
});


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            "error": "Provide address"
        });
        return;
    }

    geocode(req.query.address, (error,{latitude, longitude, location} = {}) => {
        if (error) {
            res.send({
                error: error
            })
            return
        }
        forecast({latitude, longitude}, (error, forecastData) => {
            if (error) {
                res.send({
                    error: error
                })
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            });
            
        })
    });

 
});

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Bisio'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        errorMessage: 'Page not found',
        name: 'Bisio'
    })
});

app.listen(3000,() => {
    console.log('Server is up on port 3000');
});