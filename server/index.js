// Load environment variables
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, 'config/.env') })

// Connect to database
const mongodb = require('./mongodb.js')
const { MongoClient } = require('mongodb')
const client = new MongoClient(process.env.MONGODB_URI)

// const fetch = require('node-fetch')

// Set up express
const express = require('express')
const app = express()
const port = process.env.PORT || 8080

app.use(express.static(path.join(__dirname, '../client/build'), { extensions: ['html', 'css', 'js', 'svg'] }))
app.use(express.json());

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" })
})

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

app.post('/upsert', async (req, res) => {
    try {
        const response = await mongodb.upsertDocument(client, req.body)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json(err)
    }
})

app.post('/searchByName', async (req, res) => {
    try {
        // console.log(req.body)
        const response = await mongodb.searchByName(client, req.body)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json(err.message)
    }
})

app.post('/searchWithFilters', async (req, res) => {
    try {
        // console.log(req.body)
        const response = await mongodb.searchWithFilters(client, req.body)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json(err.message)
    }
})

// app.use(function (req, res) {
//     res.status(404).sendFile(path.resolve(__dirname, '../client/build/html', '404.html'))
// })

app.listen(port, () => {
    console.log('Server started at http://localhost:' + port)
})