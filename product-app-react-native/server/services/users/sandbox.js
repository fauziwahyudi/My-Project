const { MongoClient, ServerApiVersion } = require('mongodb')

const uri = "mongodb://127.0.0.1:27017";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})

const dbName = "brand_showcase"

async function connect() {
    try {
        await client.connect()
        console.log('connect success');
        const db = client.db(dbName)
        return db
    } finally {
        await client.close()
    }
}

module.exports = connect