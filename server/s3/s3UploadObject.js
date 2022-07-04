const { PutObjectCommand } = require("@aws-sdk/client-s3")
const { s3Client } = require("./s3Client.js")
const fs = require("fs");

const s3UploadObject = async (file, docId) => {

    const uploadParams = {
        Bucket: "recipebook-images",
        Key: docId + '_' + file.originalname,
        Body: fs.createReadStream(file.path),
    }

    try {
        const data = await s3Client.send(new PutObjectCommand(uploadParams));
        console.log("Success", data);
        if (data) deleteMulterImage(file.path)
        return data; // For unit tests.
    } catch (err) {
        console.log("Error", err);
        return {error: err.message}
    }
};

const deleteMulterImage = async (filePath) => {
    fs.unlink(filePath, (err => {
        if (err) console.log(err);
        else {
            console.log("Deleted file from:" + filePath);
        }
    }));
}

module.exports = { s3UploadObject }