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

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const oneReceipt = await repositoryService.findOneAsync(id);

    res.status(200).json(oneReceipt);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await repositoryService.deleteOneAsync(id);

    res.sendStatus(204);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const model = req.body;

    console.log('PUT /:id', {id, model});

    try {
        await repositoryService.updateOneAsync(id, model);
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Ошибка при обновлении рецепта', error);
        res.status(500).json({error: 'Не удалось обновить рецепт', details: error.message});
    }
})


export default router;