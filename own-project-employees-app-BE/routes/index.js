import express from 'express';
import db from '../database/mongoClient.js';
import {EmpolyeeDocument} from '../database/dbSettings.js';
import {Employee} from '../models/Employee.js';

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json('Backend working');
});

router.post('/mongo/test', function(req, res, next) {
    const collection = db.collection(EmpolyeeDocument); 
    collection.insertOne(new Employee(1, 'John', 'Smith', 5000, false));
});

export default router;
