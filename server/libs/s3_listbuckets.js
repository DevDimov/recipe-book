// Import required AWS SDK clients and commands for Node.js.
const { ListBucketsCommand } = require("@aws-sdk/client-s3")
const { s3Client } = require("../s3/s3Client.js") // Helper function that creates an Amazon S3 service client module.

const run = async () => {
    try {
        const data = await s3Client.send(new ListBucketsCommand({}));
        // const data = await s3Client.send(new GetObjectCommand({ Bucket: 'recipebook-images', Key: 'easy-chicken-biryani.jpg' }));
        console.log("Success", data.Buckets);
        return data; // For unit tests.
    } catch (err) {
        console.log("Error", err);
    }
};

run();