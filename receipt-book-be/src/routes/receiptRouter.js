import express from 'express';
import repositoryService from '../services/repository.js';



const router = express.Router();

router.post('/', async (req, res) => {
    await repositoryService.createOneAsync(req.body);

    res.status(200).json('Object created.');
});

router.get('/', async (req, res) => {
    try {
        const allReceipts = await repositoryService.findAllAsync();
        res.status(200).json(allReceipts);
    } catch (error) {
        res.status(500).json({message: 'Ошибка при получении рецептов', error});
    }
});


export default router;