import { getWeatherInfo, getForecastInfo, validateEmptyInput } from '../scripts/services/weather-info.js'

const searchButton = document.querySelector('.search-button').addEventListener('click',(e) => {
    
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
    
    const cityName = e.target.value.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
    const key = e.which || e.keycode
    const isEnterKeyPressed = key === 13
    const inputField = document.querySelector('.input-search')
   
    if (isEnterKeyPressed) {
        if(validateEmptyInput(cityName)) return
        getWeatherInfo(cityName)
        getForecastInfo(cityName)
        inputField.value = ''
    }
})