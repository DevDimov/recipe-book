const { PutObjectCommand } = require("@aws-sdk/client-s3")
const { s3Client } = require("../s3/s3Client.js")
const path = require("path");
const fs = require("fs");

const file = "../images/one-pan-pasta.jpg";
const fileStream = fs.createReadStream(file);

// Set the parameters
const uploadParams = {
    Bucket: "recipebook-images",
    // Add the required 'Key' parameter using the 'path' module.
    Key: path.basename(file),
    // Add the required 'Body' parameter
    Body: fileStream,
};

// console.log(uploadParams)

// Upload file to specified bucket.
const run = async () => {
    try {
        const data = await s3Client.send(new PutObjectCommand(uploadParams));
        console.log("Success", data);
        return data; // For unit tests.
    } catch (err) {
        console.log("Error", err);
    }
};

run();