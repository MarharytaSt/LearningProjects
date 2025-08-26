import express from 'express';
import db from '../database/mongoClient.js';
import { EmpolyeeDocument } from '../database/dbSettings.js';
import { Employee } from '../models/employee.js';
import repository from '../services/repository.js'
import validation from '../services/validation.js';

const router = express.Router();



/* GET home page. */
router.get('/', function (req, res, next) {
  res.json('Backend working');
});

router.post('/mongo/test', function (req, res, next) {
  const collection = db.collection(EmpolyeeDocument);
  collection.insertOne(new Employee(1, 'John', 'Smith', 5000, false));
});

// POST create new employee
router.post('/employees', async (req, res) => {
  const isValid = validation.validateEmployee(req.body);

  if (!isValid) {
    res.status(400).json('Data is invalid.');

    return;
  }

  await repository.createOne(req.body);

  res.status(200).json('Employee created.');
});

// PUT update
router.put('/employees/:id', async (req, res) => {
  const isValid = validation.validateEmployee(req.body);

  if (!isValid) {
    res.status(400).json('Data is invalid.');

    return;
  }

  await repository.updateOne(req.params.id, req.body);

  res.status(200).json('Employee updated.');
});

// DELETE
router.delete('/employees/:id', async (req, res) => {
  await repository.deleteOne(req.params.id);

  res.status(200).json('Employee deleted.');
});

// GET all employees
router.get('/employees', async (req, res) => {
  const employees = await repository.findAll();

  res.json(employees);
});

// GET one employee
router.get('/employees/:id', async (req, res) => {
  const employee = await repository.findOne(req.params.id);

    res.json(employee);
});





export default router;
