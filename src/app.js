const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectioryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
console.log(viewsPath)
//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectioryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mark Stone'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Mark Stone'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is some helpful text.',
        name: 'Mark Stone'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    geocode(req.query.address, (err, {latitude, longitude, location} = {}) => {
        if(err) {
          return res.send({
              err
          })
        }
          forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
              return res.send({
                  error
              })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
      
            
      
          })
      })


    // res.send({
    //     forecast: 'Sunny',
    //     location: 'Tokyo',
    //     address: req.query.address
    // })
})



app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    } 

    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('error', {
        errorMessage: 'Help article not found',
        title: '404',
        name: 'Mark Stone'
    })
})

app.get('*',(req, res) => {
    res.render('error', {
        errorMessage: 'Page not found',
        title: '404',
        name: 'Mark Stone'
    })
})

app.listen(port, () => {
    console.log("Server is up on port " + port)
})