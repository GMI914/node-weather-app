const api = require('./api.js');

function getWeather(locations) {
    const requests = []

    locations.forEach((location) => {
        requests.push(api.getWeather(location))
    })

    return Promise.all(requests)
        .then(responses => {
            const data = []
            responses.forEach(r => {
                data.push(normaliseData(r.data))
            })
            data.sort((a, b) => a.t_temperature < b.t_temperature ? 1 : -1)
            return data
        })
}

function normaliseData(data) {
    return {
        t_time: data.current.observation_time,
        t_temperature: data.current.temperature,
        t_image: data.current.weather_icons[0],
        t_location: data.location.name
    }
}

function ConvertTohtml(data) {
    let rethtml = '<ul>'
    data.forEach(el => {
        rethtml += `
            <li>${el.t_location}: 
            time:${el.t_time} 
            temperature:${el.t_temperature}c 
            <img src='${el.t_image}'/>
            </li>
        `
    })
    return rethtml + '</ul>'
}

module.exports = {
    getWeather
}