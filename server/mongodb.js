// Load environment variables
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, 'config/.env') })

// Connect to database
const { MongoClient } = require('mongodb')
const client = new MongoClient(process.env.MONGODB_URI)

const deleteDocument = async (query) => {
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

const searchByName = async (query) => {
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

const searchByExactName = async (name) => {
    try {
        await client.connect()
        const result = await client.db("recipe_book").collection("vd_recipes").findOne({ name }, { projection: { _id: 1 } })
        return result
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

const searchWithFilters = async (filters) => {
    try {
        await client.connect()
        const query = setQuery(filters)
        // console.log(query)
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

const getLatestDocuments = async (limit) => {
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

const insertDocument = async (newDocument) => {
    try {
        await client.connect()
        return await client.db("recipe_book").collection("vd_recipes").insertOne(newDocument)
    } catch (e) {
        console.error(e)
    } finally {
        await client.close();
    }
}

const upsertDocument = async (newDoc) => {
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

const deleteDocumentById = async (docId) => {
    try {
        await client.connect()
        const result = await client.db("recipe_book").collection("vd_recipes").deleteOne({ _id: docId })
        return result
    } catch (error) {
        console.error(error);
        return { error: error.message }
    } finally {
        await client.close();
    }
}

module.exports = {
    deleteDocument,
    searchByName,
    searchByExactName,
    searchWithFilters,
    getLatestDocuments,
    insertDocument,
    upsertDocument,
    deleteDocumentById
}