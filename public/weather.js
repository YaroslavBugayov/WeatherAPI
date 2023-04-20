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
        document.getElementById('location').textContent = `${data.location.name}`
        document.getElementById('temperature').textContent = `${data.current.temp_c}°C`
        document.getElementById('cloudiness').textContent = `${data.current.cloud}%`
        document.getElementById('wind-speed').textContent = `${data.current.wind_kph}`

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
            console.log(item)
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

}
