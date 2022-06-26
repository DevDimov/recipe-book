const deleteDocument = async (client, query) => {
    try {
        await client.connect()
        const result = await client.db("recipe_book").collection("vd_recipes").deleteOne(query)
        if (result.deletedCount === 1) {
            console.log("Successfully deleted one document.");
        } else {
            console.log("No documents matched the query. Deleted 0 documents.");
        }
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

const searchByName = async (client, query) => {
    try {
        await client.connect()
        const cursor = client.db("recipe_book").collection("vd_recipes").find({ name: { $regex: query.name, $options: 'i' } })
        let result = []
        await cursor.forEach(item => result.push(item))
        return result
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

const searchWithFilters = async (client, filters) => {
    try {
        await client.connect()
        const query = setQuery(filters)
        console.log(query)
        const cursor = client.db("recipe_book").collection("vd_recipes").find(query)
        let result = []
        await cursor.forEach(item => result.push(item))
        return result
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

const setQuery = (filters) => {
    let query = {}
    for (let key of Object.keys(filters)) {
        if (key === 'category' && filters[key].length > 0) query[key] = { $all: filters.category }
        if (key === 'prepTime' && filters[key] > 5) query[key] = { $lte: filters.prepTime }
        if (key === 'servings' && filters[key] > 2) query[key] = { $gte: filters.servings }
        if (key === 'ingredients' && filters[key].length > 2) query[key] = { $regex: filters.ingredients, $options: 'i' }
    }
    return query
}

const getLatestDocuments = async (client, limit) => {
    try {
        await client.connect()
        const cursor = client.db("recipe_book").collection("vd_recipes").find({}, { limit })
        return await cursor.toArray()
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

const insertDocument = async (client, newDocument) => {
    try {
        await client.connect()
        return await client.db("recipe_book").collection("vd_recipes").insertOne(newDocument)
    } catch (e) {
        console.error(e)
    } finally {
        await client.close();
    }
}

const upsertDocument = async (client, newDoc) => {
    try {
        await client.connect()
        const coll = client.db("recipe_book").collection("vd_recipes")
        const filter = { name: newDoc.name }
        const options = { upsert: true }
        const upsertDoc = {
            $set: {
                image: newDoc.image,
                name: newDoc.name,
                description: newDoc.description,
                category: newDoc.category,
                prepTime: newDoc.prepTime,
                servings: newDoc.servings,
                ingredients: newDoc.ingredients,
                method: newDoc.method
            }
        }
        return await coll.updateOne(filter, upsertDoc, options)

    } catch (e) {
        console.error(e)
    } finally {
        await client.close();
    }
}

module.exports = {
    deleteDocument,
    searchByName,
    searchWithFilters,
    getLatestDocuments,
    insertDocument,
    upsertDocument
}