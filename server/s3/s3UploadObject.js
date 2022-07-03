const { PutObjectCommand } = require("@aws-sdk/client-s3")
const { s3Client } = require("./s3Client.js")
const fs = require("fs");

const s3UploadObject = async (file, docId) => {
    // const filePath = file.path
    // const objectKey = file.originalname + docId
    const uploadParams = {
        Bucket: "recipebook-images",
        Key: docId + file.originalname,
        Body: fs.createReadStream(file.path),
    }

    try {
        const data = await s3Client.send(new PutObjectCommand(uploadParams));
        console.log("Success", data);
        return data; // For unit tests.
    } catch (err) {
        console.log("Error", err);
    }
};

// s3UploadObject({
//     originalname: 'Original name',
//     path: 'uploads\\c16ec8612fb780f5486025d40355d014'
// }, 'docIdTest_')

module.exports = { s3UploadObject }