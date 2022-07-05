const s3GetImage = async (objectKey) => {
    return fetch(`/images/${objectKey}`, {
        method: 'GET',
    })
        .then(response => response.blob())
        .then(data => {
            // console.log('Success:', data);
            return URL.createObjectURL(data);
        })
        .catch((error) => {
            console.error('Error:', error);
            return { error }
        })
}

export {
    s3GetImage
}