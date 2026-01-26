import Database from './mongoClient.js';
import { SplitwiseDocument } from './dbSettings.js';

let collection;

try {
    collection = await Database.collection(SplitwiseDocument);
} catch (e) {
    console.error(e);
}

export default collection;