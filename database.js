//////////////
// IMPORTS //
////////////
const { MongoClient } = require("mongodb");
///////////////
// SETTINGS //
/////////////
const CONNECTION_STRING =
  "mongodb+srv://Debranch:0JaT7K6cSe5HAoLI@cluster0.o9alt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
////////////////
// FUNCTIONS //
//////////////
async function getDb(database) {
  const client = new MongoClient(CONNECTION_STRING);
  await client.connect();
  const db = await client.db(database);
  return db;
}
//////////////
// EXPORTS //
////////////
module.exports = getDb;
