const { PutObjectCommand } = require("@aws-sdk/client-s3")
const { s3Client } = require("./s3Client.js")

// Set the parameters.
const bucketParams = {
    Bucket: "recipebook-images",
    // Specify the name of the new object. For example, 'index.html'.
    // To create a directory for the object, use '/'. For example, 'myApp/package.json'.
    Key: "OBJECT_NAME",
    // Content of the new object.
    Body: "BODY",
};

// Create and upload the object to the S3 bucket.
const run = async () => {
    try {
        const data = await s3Client.send(new PutObjectCommand(bucketParams));
        console.log(
            "Successfully uploaded object: " +
            bucketParams.Bucket +
            "/" +
            bucketParams.Key
        );
        return data; // For unit tests.
    } catch (err) {
        console.log("Error", err);
    }
};

run();