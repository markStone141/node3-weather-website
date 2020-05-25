const request = require('postman-request')


const forecast = (lati, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=3636f51b3385ce2cf73d965792c7a8df&query=${lati},${long}`
    
    request({url, json: true}, (err, {body}) => {
        if(err) {
            callback("Unable to connect weather service", undefined)
        } else if(body.err) {
            callback({err: "Unable to find location"}, undefined)
        } else {
            let time = body.current.observation_time
            let temperature = body.current.temperature
            let city = body.location.name
            callback(undefined, body.current.weather_descriptions + `. It's now ${temperature} degrees here in ${city}.  ${time}.` )
        }
    }) 
   
}

module.exports = forecast