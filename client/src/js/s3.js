const s3GetImage = async (objectKey) => {
    return fetch(`/images/${objectKey}`, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            // console.log('Success:', data);
            return data
        })
        .catch((error) => {
            console.error('Error:', error);
            return error
        })
}

const uploadImage = async (formData) => {
    fetch('/uploadImage', {
        method: 'POST',
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            return data
        })
        .catch((error) => {
            console.error('Error:', error);
            return error
        })
}

export {
    s3GetImage,
    uploadImage
}