import Database from './mongoClient.js';
import { EmpolyeeDocument } from './dbSettings.js';

let collection;

try {
    collection = await Database.collection(EmpolyeeDocument);
} catch (e) {
    console.error(e);
}

export default collection;