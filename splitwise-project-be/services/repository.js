import collection from '../database/collectionClient.js';
import { ObjectId } from 'mongodb';


async function createOneAsync(model) {
    await collection.insertOne(model);
}


async function updateOneAsync(id, model) {
    const query = { _id: ObjectId.createFromHexString(id) };
    const update = {
        "$set" : model
    };

    await collection.updateOne(query, update);
}

async function deleteOneAsync(id) {
    const query = { _id: ObjectId.createFromHexString(id) };

    await collection.deleteOne(query);
}

async function findAllAsync() {
    return await collection.find({}).toArray();
}

async function findOneAsync(id) {
    const query = { _id: ObjectId.createFromHexString(id) };

    return await collection.findOne(query);
}

const repositoryService = {
    createOneAsync,
    updateOneAsync,
    deleteOneAsync,
    findAllAsync,
    findOneAsync
};

export default repositoryService;