import express from 'express';
import repositoryService from '../services/repository.js';



const router = express.Router();


router.post('/', async (req, res) => {
  await repositoryService.createOneAsync(req.body);

  res.status(200).json('Object created.');
});




export default router;
