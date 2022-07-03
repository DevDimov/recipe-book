// Load environment variables
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, 'config/.env') })

// Import database CRUD actions
const mongodb = require('./mongodb.js')

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const { s3UploadObject } = require('./s3/s3UploadObject')

// const fetch = require('node-fetch')

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
        // console.log(req.body)
        // console.log(req.file)
        const mongoResponse = await mongodb.insertDocument(req.body)
        console.log(mongoResponse)
        const docId = mongoResponse.insertedId
        let s3Response = {}
        // if (docId) {
        s3Response = await s3UploadObject(req.file, docId)
        return res.status(200).json({ insertedId: docId, mongodb: mongoResponse, s3: s3Response })
        // }

    } catch (err) {
        return res.status(500).json(err.message)
    }
})

// app.post('/insert', async (req, res) => {
//     try {
//         const response = await mongodb.insertDocument(req.body)
//         return res.status(200).json(response)
//     } catch (err) {
//         return res.status(500).json(err.message)
//     }
// })

app.post('/upsert', async (req, res) => {
    try {
        const response = await mongodb.upsertDocument(req.body)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json(err)
    }
})

app.post('/searchByName', async (req, res) => {
    try {
        // console.log(req.body)
        const response = await mongodb.searchByName(req.body)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json(err.message)
    }
})

app.post('/searchByExactName', async (req, res) => {
    try {
        console.log(req.body)
        const mongoResponse = await mongodb.searchByExactName(req.body.name)
        console.log(mongoResponse)
        const response = { _id: mongoResponse ? mongoResponse._id.toString() : '' }
        console.log(response)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json(err.message)
    }
})

app.post('/searchWithFilters', async (req, res) => {
    try {
        // console.log(req.body)
        const response = await mongodb.searchWithFilters(req.body)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json(err.message)
    }
})

// app.post('/uploadImage', upload.single('image'), async (req, res) => {
//     try {
//         console.log(req.body)
//         console.log(req.file)
//         // console.log(req.body.formData())
//         // const response = await s3UploadObject()
//         // return res.json(response)
//         return res.json({ message: 'Response from /uploadImage' })
//     } catch (err) {
//         return res.status(500).json(err.message)
//     }
// })

// app.use(function (req, res) {
//     res.status(404).sendFile(path.resolve(__dirname, '../client/build/html', '404.html'))
// })

app.listen(port, () => {
    console.log('Server started at http://localhost:' + port)
})