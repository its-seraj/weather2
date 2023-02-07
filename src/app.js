const path = require('path')
const express = require('express')
const http = require('http');
const hbs = require('hbs');
const { serialize } = require('v8');
const { response } = require('express');

const app = express();

/**
 * for hbs template
*/
const staticPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(staticPath)) // use to map static files path

app.get('', (req, res) => {
    res.render('index', {
        title: 'Homepage',
        name: 'Rehan',
    })
})

app.get('/help', (req, res) => {
    /**
     * HBS template
     */
    res.render('help', {
        title: 'Help',
        name: 'Raghav',
        page: 'This is the help page using HBS.',
        description: 'I am here to help. Pls ask if any doubt.'
    })
})

// weather & about page
app.get('/weather', (req, res) => {
    let data = {};
    
    if(!req.query.address){
        return res.send({
            error: 'Please send an address parameter.'
        })
    }
    const geo_url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + req.query.address + '.json?access_token=pk.eyJ1Ijoic2VyYWoyNiIsImEiOiJjbGRvZGp3eWswOTBqM25xdmszZnlkeWZ6In0.-qlUmutN53yVZEJr1tuyfQ&limit=1'
    const weather_url = 'http://api.weatherstack.com/current?access_key=7fef760a3082832acf24d3d4299d7033&query=20,30';

    // call geolocation api
    const requestGeo = http.request(geo_url, (responseGeo) => {
        responseGeo.on('data', (chunk) => {
            data.geolocation = JSON.parse(chunk.toString()).features[0];
            return res.send(data);
        })
    })
    requestGeo.end()

    // call weather api using http request
    const request = http.request(weather_url, (response) => {
        response.on('data', (chunk) => {
            data = JSON.parse(chunk.toString())
        })

        response.on('end', () => {
            /**
             * HBS template
             */
            res.render('weather', {
                title: 'Weather',
                name: 'Aman',
                data: JSON.stringify(data),
            })
        })
    })
    request.on('error', (error) => {
        data = error
    })
    request.end();

})

app.get('/about', (req, res) => {
    res.send('<b>Welocme to about page.</b>')
})


app.get('/product', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must need to provide search term.'
        })
    }
    console.log(req.query)

    res.send({
        product: []
    })
})

// 404 page
app.get('*', (req, res) => {
    res.render('404')
})

app.listen(8090, () => {
    console.log('server is up on port 8090.');
})

