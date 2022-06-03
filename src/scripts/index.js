const authKey = '7ebe7c2a03cd48c090a193437222905'

const searchButton = document.querySelector('.search-button').addEventListener('click',() => {
    
    const inputField = document.querySelector('.input-search')
    const cityName = inputField.value.normalize('NFD').replace(/[\u0300-\u036f]/g, "")

    if(cityName) {
        getWeatherInfo(cityName)
        getForecastInfo(cityName)
        inputField.value = ''
    } else {
        validateEmptyInput(cityName)
        e.preventDefault()
    }   
})

const searchEnterKey = document.querySelector('.input-search').addEventListener('keyup', (e) => {
    
    const inputField = document.querySelector('.input-search')
    const cityName = e.target.value.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
    const key = e.which || e.keycode
    const isEnterKeyPressed = key === 13
   
    if (isEnterKeyPressed) {
        if(validateEmptyInput(cityName)) return
        getWeatherInfo(cityName)
        getForecastInfo(cityName)
        inputField.value = ''
    }
})

function validateEmptyInput(cityName){
    if(cityName.length === 0){
        alert("Informe uma cidade")
        return true
    }
}

async function getWeatherInfo(cityName) {

    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${ authKey }&q=${ cityName }&aqi=no&lang=pt`)
        const data = await response.json()
    
        let location = document.querySelector('.weather-section')

        if(data) {
            location.innerHTML = `  <div class="weather-container">
                                        <h2>Previsão do tempo para:</h2>
                                        <h3>${data.location.name} - ${data.location.region}</h3>
                                        <img alt="ícone do clima" src="${data.current.condition.icon}">
                                        <p> Condições climáticas: ${data.current.condition.text}</p>
                                        <span>Temperatura atual: ${data.current.temp_c} °C</span>
                                        <span>Sensação térmica: ${data.current.feelslike_c} °C</span>
                                    </div>`
        }    
    } catch (err) {
        console.log(err)
    }    
}

async function getForecastInfo(cityName) {
    
    try{
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${ authKey }&q=${ cityName }&days=10&aqi=no&lang=pt`)
        const data = await response.json()
        
        let forecastTitle = document.querySelector('.forecast-title')
        forecastTitle.innerHTML = 'Previsão para os próximos dias:'
    
        let forecast = document.querySelector('.forecast-list') 
        forecast.innerHTML = ''
            
        let forecastInfo = data.forecast.forecastday
        
        forecastInfo.forEach((item) => {

            const dateUnix = ((item.date_epoch + 86400)* 1000)
            const newDate = new Date(dateUnix)
            const forecastWeekDay = newDate.toLocaleString("pt-BR", {weekday: "long"})
            const forecastDay = newDate.toLocaleString("pt-BR", {day: "numeric"})
            const forecastMonth = newDate.toLocaleString("pt-BR", {month: "long"})
            
            forecast.innerHTML += ` <li> 
                                        <h2>${forecastWeekDay} - 0${forecastDay}</h2>
                                        <h3>${item.day.condition.text}</h3>
                                        <p>${item.day.daily_chance_of_rain} % - ${item.day.totalprecip_mm} mm</p>
                                        <img alt="ícone do clima" src="${item.day.condition.icon}">
                                        <p>🌡 ${item.day.mintemp_c} °C</p>
                                        <p>🌡 ${item.day.maxtemp_c} °C</p>
                                    </li>`                                                         
        }) 
    } catch (err) {
        console.log(err)
    }     
}