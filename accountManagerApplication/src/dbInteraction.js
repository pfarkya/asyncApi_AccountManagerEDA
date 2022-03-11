const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&writeConcern=majority";
const client = new MongoClient(uri);
async function updateAccount(data) {
  try {
    await client.connect();
    const database = client.db('myDB');
    const accounts = database.collection('accounts');
    const query = { name: data.name, email: data.email };
    const options = {upsert: true}
    const account = await accounts.updateOne(query, data, options);
    return account
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
module.exports = {
    updateAccount
}