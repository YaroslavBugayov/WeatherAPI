window.onload = function () {
    const apiKey = 'f76dc91df8de4ffb82a211614231904'

    async function getWeatherData(location = 'Kiev') {
        const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`
        const res = await fetch(url)
        return await res.json()
    }

    function fillHtml(data) {
    document.getElementById('temperature').textContent = `${data.current.temp_c}°C`
    document.getElementById('cloudiness').textContent = `${data.current.cloud}%`
    document.getElementById('wind-speed').textContent = `${data.current.wind_kph}`
    }

    getWeatherData()
        .then(data => fillHtml(data))
        .catch(error => console.log(error))

}
