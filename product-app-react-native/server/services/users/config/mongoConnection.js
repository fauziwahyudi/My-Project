
const { MongoClient } = require("mongodb");

const connectionString = "mongodb+srv://fauziwahyudi12:p6cyfYBlYCDTXUMJ@cluster0.rrkrwgw.mongodb.net/";

let db = null;

const mongoConnect = async () => {
  const client = new MongoClient(connectionString);

  try {
    const database = client.db("brand_showcase");

    db = database;

    return database;
    
  } catch (err) {
    console.log(err);
  }
};


const getDatabase = () => db;

module.exports = {
  mongoConnect,
  getDatabase,
};
