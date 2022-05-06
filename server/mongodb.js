

const listDatabases = async (client) => {
    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

const listRecipes = async (client) => {
    const recipesList = await client.db("recipe_book").collection("vd_recipes").findOne()
    console.log("Recipes list:", recipesList);
}

const createRecipe = async (client, newRecipe) => {
    const result = await client.db("recipe_book").collection("vd_recipes").insertOne(newRecipe);
    console.log(`New recipe added with the following id: ${result.insertedId}`);
}

const main = async (client) => {
    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        await listRecipes(client)
        // await createRecipe(client, {name: "Test", serves: 4})
        // await listDatabases(client);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

module.exports = { main }