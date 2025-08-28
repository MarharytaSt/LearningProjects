import { MongoClient } from "mongodb";
import { ConnectionString, DatabaseName } from './dbSettings';


const client = new MongoClient(ConnectionString);
let connection;
let db;

try {
    connection = await client.connect();
    db = connection.db(DatabaseName);
} catch (error) {
    console.error(error);
}

export default db;