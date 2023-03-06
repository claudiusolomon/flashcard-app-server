const { MongoClient } = require("mongodb");
const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri, {});

module.exports = {
    connectToMongoDb: async function () {
            await client.connect();
            console.log("Successfully connected to MongoDb!");
            return client.db(process.env.DATABASE_NAME);
    }
};
