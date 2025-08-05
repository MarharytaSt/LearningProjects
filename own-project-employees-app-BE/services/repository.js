import collection from "../database/collectionClient.js";
import { ObjectId } from 'mongodb';

async function createOne(model) {
    await collection.insertOne(model);
}

async function updateOne(id, model) {
    const query = { _id: ObjectId.createFromHexString(id) };
    const update = {
        "$set": model
    };

    await collection.updateOne(query, update);
}

async function deleteOne(id) {
    const query = { _id: ObjectId.createFromHexString(id) };

    await collection.deleteOne(query);
}

async function findAll() {
    const result = await collection.find({}).toArray();

    return result;
}

async function findOne(id) {
    const query = { _id: ObjectId.createFromHexString(id) };
    const result = await collection.findOne(query);

    return result;
}


const repositoryService = {
    createOne,
    updateOne,
    deleteOne,
    findAll,
    findOne
};

export default repositoryService;