// Load environment variables
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, 'config/.env') })

// Connect to database
const mongodb = require('./mongodb.js')
const { MongoClient } = require('mongodb')
const client = new MongoClient(process.env.MONGODB_URI)
mongodb.main(client)

// const fetch = require('node-fetch')

// Set up express
const express = require('express')
const app = express()
const port = process.env.PORT || 8080

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" })
})

// app.use(express.static(path.join(__dirname, '../client/build'), { extensions: ['html', 'css', 'js', 'svg'] }))

// app.get('/api', async (req, res) => {
//     try {
//         const cityID = req.query.id
//         const cityName = req.query.q
//         const lang = req.query.lang
//         const apiKey = process.env.API_KEY
//         const url = 'http://api.openweathermap.org/data/2.5/forecast'

//         let query = ''
//         if (cityID) query = `id=${cityID}`
//         if (cityName) query = `q=${cityName}`

//         // const url = 'http://api.openweathermap.org/errorURLforDevEnv'
//         const response = await fetch(`${url}?${query}&lang=${lang}&units=metric&appid=${apiKey}`)
//         const data = await response.json()
//         // console.log(data)
//         return res.status(200).json(data)
//     } catch (err) {
//         // console.log(err.message)
//         return res.status(500).json(err.message)
//     }
// })

// app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
// })

// app.get('/about', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../client/build/html', 'about.html'))
// })

// app.use(function (req, res) {
//     res.status(404).sendFile(path.resolve(__dirname, '../client/build/html', '404.html'))
// })

app.listen(port, () => {
    console.log('Server started at http://localhost:' + port)
})