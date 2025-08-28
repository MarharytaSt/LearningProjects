import Database from './mongoClient';
import { ReceiptsDocument } from './dbSettings';

let collection;

try {
    collection = await Database.collection(ReceiptsDocument);
} catch (error) {
    console.error(error);
}

export default collection;