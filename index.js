const http = require('http')

const apiKey = 'f76dc91df8de4ffb82a211614231904'
const location = 'Kiev'
const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`

http.get(url, res => {
    let data = ''
    res.on('data', chunk => {
        data += chunk
    })
    res.on('end', () => {
        const weatherData = JSON.parse(data)
        console.log(weatherData)
    })

}).on('error', (err) => {
    console.log(err)
})