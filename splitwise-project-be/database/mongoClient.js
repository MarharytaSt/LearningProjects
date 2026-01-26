import {MongoClient} from 'mongodb';
import {ConnectionString, DatabaseName} from './dbSettings.js';


const client = new MongoClient(ConnectionString);
let connection;
let db;

try {
    connection = await client.connect();
    db = connection.db(DatabaseName);
} catch (e) {
    console.error(e);
}

export default db;