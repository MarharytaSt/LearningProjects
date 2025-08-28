import Database from './mongoClient.js';
import { ReceiptsDocument } from './dbSettings.js';

let collection;

try {
    collection = await Database.collection(ReceiptsDocument);
} catch (error) {
    console.error(error);
}

export default collection;