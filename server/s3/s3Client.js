const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../config/.env') })

// Create service client module using CommonJS syntax.
const { S3Client } = require("@aws-sdk/client-s3");

// const bucketName = process.env.AWS_BUCKET_NAME
// const region = process.env.AWS_BUCKET_REGION
// const accessKeyId = process.env.AWS_ACCESS_KEY_ID
// const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

// Create Amazon S3 service object.
const s3Client = new S3Client({region: "eu-west-2"});

module.exports = { s3Client }