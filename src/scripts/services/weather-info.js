import { baseWeatherUrl, baseForecastUrl, authKey, airQuality, forecastDaysQuantity, dataLanguage } from '../variables.js'

async function getWeatherInfo(cityName) {

    try {
        const response = await fetch(`${baseWeatherUrl}${authKey}&q=${cityName}&${airQuality}&${dataLanguage}`)
        const data = await response.json()
    
        const location = document.querySelector('.weather-section')
        const poweredInformation = document.querySelector('.powered')

        if(data.error) {
            validateCity()
            return            
        } else if (data) {
            location.innerHTML = `  <div class="weather-container">
                                        <h2>Previsão do tempo para:</h2>
                                        <h3>${data.location.name} - ${data.location.region}</h3>
                                        <img alt="ícone do clima" src="${data.current.condition.icon}">
                                        <p> Condições climáticas: ${data.current.condition.text}</p>
                                        <span>Temperatura atual: ${data.current.temp_c} °C</span>
                                        <span>Sensação térmica: ${data.current.feelslike_c} °C</span>
                                    </div>`

            poweredInformation.style.color = 'lightgrey'
        }    
    } catch (err) {
        console.log(err)
    }    
}

async function getForecastInfo(cityName) {
    
    try{
        const response = await fetch(`${baseForecastUrl}${authKey}&q=${cityName}&${forecastDaysQuantity}&${airQuality}&${dataLanguage}`)
        const data = await response.json()
        
        const forecastTitle = document.querySelector('.forecast-title')
        forecastTitle.innerHTML = 'Previsão para os próximos dias:'
    
        const forecast = document.querySelector('.forecast-list') 
        forecast.innerHTML = ''
            
        const forecastInfo = data.forecast.forecastday
        
        forecastInfo.forEach((item) => {

            const dateUnix = ((item.date_epoch + 86400)* 1000)
            const newDate = new Date(dateUnix)
            const forecastWeekDay = newDate.toLocaleString("pt-BR", {weekday: "long"})
            const forecastDay = newDate.toLocaleString("pt-BR", {day: "numeric"})
            
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

function validateEmptyInput(cityName){
    if(cityName.length === 0){
        validateCity()
        return 
    }
}

function validateCity(){
    alert("Informe uma cidade válida")
    return 
}

export { getWeatherInfo, getForecastInfo, validateEmptyInput }