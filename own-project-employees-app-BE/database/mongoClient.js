import {MongoClient} from 'mongodb';
import {ConnectionString, DatabaseName} from './dbSettings.js';


const client = new MongoClient(ConnectionString);
let connection;

try {
    connection = await client.connect();
}catch(e) {
    console.error(e);
}

const db = connection.db(DatabaseName);

export default db;