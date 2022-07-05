const checkDuplicateName = async (query) => {
    return fetch('/searchByExactName', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(query),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Duplicate name check:', data);

            if (data._id.length > 0) {
                return { match: true, _id: data._id }
            }
            return { match: false, _id: '' }
        })
        .catch((error) => {
            console.error('Error checking for duplicate name:', error);
            return error
        })
}

const insertDocument = async (formData) => {
    return fetch('/insert', {
        method: 'POST',
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            console.log('Successfully inserted doc to MongoDB:', data);
            return data
        })
        .catch((error) => {
            console.error('Error inserting doc to MongoDB:', error);
            return error
        })
}

const upsertDocument = async (data) => {
    return fetch('/upsert', {
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
    return fetch('/searchByName', {
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
            return []
        })
}

const searchByExactName = async (query) => {
    return fetch('/searchByExactName', {
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
    return fetch('/searchWithFilters', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(query),
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

const getRecipes = async (limit) => {
    return fetch(`/recipes/${limit}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
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
    checkDuplicateName,
    insertDocument,
    upsertDocument,
    searchByName,
    searchByExactName,
    searchWithFilters,
    getRecipes
}