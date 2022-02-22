//////////////
// IMPORTS //
////////////
const { MongoClient } = require("mongodb");
const { mongoUser, mongoPassword } = require("./credentials");
///////////////
// SETTINGS //
/////////////
const CONNECTION_STRING = `mongodb+srv://${mongoUser}:${mongoPassword}@cluster0.o9alt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
////////////////
// FUNCTIONS //
//////////////
async function getDb(database) {
  const client = new MongoClient(CONNECTION_STRING);
  await client.connect();
  const db = client.db(database);
  return db;
}
//////////////
// EXPORTS //
////////////
module.exports = getDb;
