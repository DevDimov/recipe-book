const { GetObjectCommand } = require("@aws-sdk/client-s3")
const { s3Client } = require("./s3Client.js")

const s3GetObject = async (objectKey) => {

    // Create a helper function to convert a ReadableStream to a string.
    const streamToString = (stream) =>
        new Promise((resolve, reject) => {
            const chunks = [];
            stream.on("data", (chunk) => chunks.push(chunk));
            stream.on("error", reject);
            // stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8"))); // AWS docs suggest changing the encoding but that causes an error when displaying image on the front-end
            stream.on("end", () => resolve(Buffer.concat(chunks)));
        });

    try {

        // Get the object from the Amazon S3 bucket. It is returned as a ReadableStream.
        const response = await s3Client.send(new GetObjectCommand({
            Bucket: "recipebook-images",
            Key: objectKey,
        }))

        // Convert the ReadableStream to a string.
        const bodyContents = await streamToString(response.Body);
        // console.log(bodyContents)
        return bodyContents

    } catch (err) {
        console.log("Error", err);
        return { error: err.message }
    }
};

module.exports = { s3GetObject }