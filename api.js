const axios = require("axios");

/*
298d372cd04e18a7519f3d8e9c2e0768
*/

const api_key = '87f3c32b828bc822ec3fa2acd843b335'
const baseUrl = 'http://api.weatherstack.com/'
// const baseUrl = 'https://catfact.ninja/'

const ajax = axios.create({
    baseURL: baseUrl
})

function getWeather(location) {
    return ajax.get("/current", {
        params: {
            access_key: api_key,
            query: location,
            units: 'm'
        }
    })
}

module.exports = {
    getWeather
}