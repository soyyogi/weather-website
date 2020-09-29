const path = require('path');
const express = require('express');
const hbs = require('hbs');
const getWeatherData = require('./utils/weather');


const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Yogesh Yadav'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Yogesh Yadav'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Yogesh Yadav'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
   
    getWeatherData(req.query.address).then(data => {
        return res.send({
            forecast: data[0].current.temp + '\u00B0' + ', ' + data[0].current.weather[0].description,
            location: data[1],
            address: req.query.address
        })
    }).catch(error => {
        return res.send({
            error : 'Unable to find location. Try another search.'
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Yogesh Yadav',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Yogesh Yadav',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})