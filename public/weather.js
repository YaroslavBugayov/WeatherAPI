window.onload = function () {
    const apiKey = 'f76dc91df8de4ffb82a211614231904'

    const forecastField = document.getElementById('forecast')
    const cityDropBox = document.getElementById('drop_box')
    const submitButton = document.getElementById('submit_button')
    const city = document.getElementById('city')

    setCity('Kiev')

    submitButton.onclick = function () {
        setCity(city.value)
        cityDropBox.value = ''
    }

    cityDropBox.addEventListener('change', function () {
        setCity(this.value)
        city.value = ''
    })


    async function getWeatherData(location) {
        const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=10`
        const res = await fetch(url)
        return await res.json()
    }

    function fillHtml(data) {
        document.getElementById('location').textContent = data.location.name
        document.getElementById('condition').textContent = data.current.condition.text
        document.getElementById('condition_icon').src = data.current.condition.icon
        document.getElementById('temperature').textContent = `${data.current.temp_c}°C`
        document.getElementById('cloudiness').textContent = `${data.current.cloud}%`
        document.getElementById('wind-speed').textContent = data.current.wind_kph

        setBackground(data.current.condition.text)

        forecastField.innerHTML = ''
        data.forecast.forecastday.forEach(item => {
            forecastField.innerHTML +=
                `
                    <div class="weather_day_block" id="${item.date}">
                        <div class="weather_block">
                            <p>Date: ${item.date}</p>
                            <p>Condition: ${item.day.condition.text}</p>
                            <img class="condition_image" src="${item.day.condition.icon}" alt="condition icon">
                            <p>Avarage temp: ${item.day.avgtemp_c}</p>
                            <p>Minimum temp: ${item.day.mintemp_c}</p>
                            <p>Maximum temp: ${item.day.maxtemp_c}</p>
                        </div>
                    </div>
                `
            const temp = document.getElementById(`${item.date}`)
            item.hour.forEach((hour, i) => {
                if (i % 4 === 0) {
                    temp.innerHTML +=
                        `
                            <div class="weather_block">
                                <p>Hour: ${i}:00</p>
                                <p>Condition: ${hour.condition.text}</p>
                                <img class="condition_image" src="${hour.condition.icon}" alt="condition icon">
                                <p>Temperature: ${hour.temp_c}</p>
                                <p>Cloudiness: ${hour.cloud}</p>
                                <p>Wind speed: ${hour.wind_kph}</p>
                            </div>
                        `
                }

            })
        })
    }

    function printError() {
        forecastField.innerHTML =
            `
                <h2>City not found<h2>
            `
    }

    function setCity(city) {
        getWeatherData(city)
            .then(data => fillHtml(data))
            .catch(_ => printError())
    }

    function setBackground(condition) {
        const body = document.body.style
        switch (condition) {
            case 'Clear':
                body.background = '#FFF'
                break
            case 'Cloudy':
                body.background = '#999'
                break
            case 'Partly cloudy':
                body.background = '#BBB'
                break
            case 'Sunny':
                body.background = '#e7eba0'
                break
            case 'Overcast':
                body.background = '#666'
                break
            case 'Rain':
                body.background = '#bfd1ff'
                break
            case 'Light rain':
                body.background = '#b3cdff'
                break
            case 'Heavy rain':
                body.background = '#a2c0fa'
                break
            case 'Drizzle':
                body.background = '#829dd1'
                break
            case 'Light drizzle':
                body.background = '#829dd1'
                break
            case 'Heavy drizzle':
                body.background = '#829dd1'
                break
            case 'Thunderstorm':
                body.background = '#919191'
                break
            case 'Snow':
                body.background = '#f2f2f2'
                break
            case 'Light snow':
                body.background = '#FFF'
                break
            case 'Heavy snow':
                body.background = '#FFF'
                break
            case 'Mist':
                body.background = '#999'
                break
            case 'Smoke':
                body.background = '#999'
                break
            case 'Haze':
                body.background = '#999'
                break
            case 'Fog':
                body.background = '#999'
                break
            case 'Sand/dust':
                body.background = '#999'
                break
            case 'Ash':
                body.background = '#999'
                break
            case 'Squalls':
                body.background = '#999'
                break
            case 'Tornado':
                body.background = '#999'
                break
        }
    }

}
