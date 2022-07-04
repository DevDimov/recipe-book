// Load environment variables
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, 'config/.env') })

// Import database CRUD actions
const mongodb = require('./mongodb.js')

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const { s3UploadObject } = require('./s3/s3UploadObject')
const { s3GetObject } = require('./s3/s3GetObject')

// Set up express
const express = require('express')
const app = express()
const port = process.env.PORT || 8080

app.use(express.static(path.join(__dirname, '../client/build'), { extensions: ['html', 'css', 'js', 'svg'] }))

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" })
})

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

app.post('/insert', upload.single('file'), async (req, res) => {
    try {
        const formData = {
            ...req.body,
            category: req.body.category.split(','),
            prepTime: parseInt(req.body.prepTime),
            servings: parseInt(req.body.servings),
            method: req.body.method.split(',')
        }
        // console.log(formData)

        const mongoResponse = await mongodb.insertDocument(formData)
        console.log(mongoResponse)
        const docId = mongoResponse.insertedId

        s3Response = await s3UploadObject(req.file, docId)
        if (s3Response.error) {
            mongodb.deleteDocumentById(docId)
            return res.status(404).json({ error: 'Unable to upload image' })
        }

        return res.status(200).json({ insertedId: docId, mongodb: mongoResponse, s3: s3Response })

    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
})

app.get('/images/:key', async (req, res) => {
    const objectKey = req.params.key
    // console.log(objectKey)
    try {
        const image = await s3GetObject(objectKey)
        res.writeHead(200, { 'Content-Type': 'image/jpeg' })
        res.end(image) // Send the file data to the browser.
        // return res.send(response)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
})

app.get('/recipes/:limit', async (req, res) => {
    try {
        const limit = parseInt(req.params.limit)
        const response = await mongodb.getLatestDocuments(limit)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
})

app.post('/searchByName', async (req, res) => {
    try {
        const response = await mongodb.searchByName(req.body)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
})

app.post('/searchByExactName', async (req, res) => {
    try {
        const mongoResponse = await mongodb.searchByExactName(req.body.name)
        const response = { _id: mongoResponse ? mongoResponse._id.toString() : '' }
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
})

app.post('/searchWithFilters', async (req, res) => {
    try {
        const response = await mongodb.searchWithFilters(req.body)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
})

app.post('/upsert', async (req, res) => {
    try {
        const response = await mongodb.upsertDocument(req.body)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json(err)
    }
})

// app.use(function (req, res) {
//     res.status(404).sendFile(path.resolve(__dirname, '../client/build/html', '404.html'))
// })

app.get('/test', async (req, res) => {
    const fs = require("fs");

    try {
        const image = fs.readFileSync("D:\\Visual Studio Code\\recipe-book\\server\\test\\pending-image")
        res.writeHead(200, { 'Content-Type': 'image/jpeg' })
        res.end(image) // Send the file data to the browser.
        // return image
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
})

app.listen(port, () => {
    console.log('Server started at http://localhost:' + port)
})