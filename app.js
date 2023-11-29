const express = require("express")
const fs = require('fs')
const utils = require('./utils.js')
const path = require('path')
const hbs = require('hbs')

const app = express()
const port = 8000

const PublicPath = path.join(__dirname, './public')
const ViewsPath = path.join(__dirname, './template/views')
const ParshalPath = path.join(__dirname, './template/partials')

app.use(express.static(PublicPath))
app.set('view engine', 'hbs')
app.set('views', ViewsPath)
hbs.registerPartials(ParshalPath)

app.get("/", (req, res) => {
    res.render('index')
    // const locations = JSON.parse(fs.readFileSync('./locations.json').toString())
    // utils.getWeather(locations)
    //     .then(response => {
    //         res.render('index',{response})
    //     })
})

app.get('/weather', (req, res) => {
    const location = req.query.location
    if (location) {
        const locations = location.split(',')
        utils.getWeather(locations)
            .then(data => {
                return res.send(data)
            })
            .catch(() => {
                res.send({ error: 'location not found' })
            })
    } else {
        res.send({ error: 'location not provided' })
    }
})

app.listen(port, () => {
    console.log("Server running on http://localhost:" + port)
})