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

const findMultipleDocuments = async (client, query) => {
    try {
        await client.connect()
        const result = await client.db("recipe_book").collection("vd_recipes").find(query)
        if ((await result.count()) === 0) {
            console.log("No documents found!")
        }
        // replace console.dir with your callback to access individual elements
        await result.forEach(console.dir)
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

module.exports = { deleteDocument, findMultipleDocuments, insertDocument, upsertDocument }