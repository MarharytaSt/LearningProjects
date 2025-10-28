import express from 'express';
import repositoryService from '../services/repository.js';



const router = express.Router();

router.post('/', async (req, res) => {
    await repositoryService.createOneAsync(req.body);

    res.status(200).json('Object created.');
});

router.get('/', async (req, res) => {
    const allReceipts = await repositoryService.findAllAsync();
    
    res.status(200).json(allReceipts);
});

router.get('/:id', async (req,res) => {
    const {id} = req.params;
    const oneReceipt = await repositoryService.findOneAsync(id);

    res.status(200).json(oneReceipt);
})


export default router;