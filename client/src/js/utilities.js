const insertDocument = async (data) => {
    fetch('/insert', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        })
}

const upsertDocument = async (data) => {
    fetch('/upsert', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
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

const searchByName = async (query) => {
    fetch('/searchByName', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(query),
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

const searchWithFilters = async (query) => {
    fetch('/searchWithFilters', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(query),
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
    insertDocument,
    upsertDocument,
    searchByName,
    searchWithFilters,
}