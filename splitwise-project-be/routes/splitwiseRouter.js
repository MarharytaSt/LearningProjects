import express from 'express';
import repositoryService from '../services/repository.js';



const router = express.Router();


router.post('/accounts', async (req, res) => {
  await repositoryService.createOneAsync(req.body);

  res.status(200).json('Object created.');
});

router.get('/accounts', async (req, res) => {

  try {
    const allAccounts = await repositoryService.findAllAsync();
    res.status(200).json(allAccounts);
  } catch (error) {
    console.error('Ошибка при получении аккаунтов:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

router.get('/accounts/:id', async (req, res) => {
  const account = await repositoryService.findOneAsync(req.params.id);
  res.status(200).json(account);
});

router.delete('/accounts/:id', async (req, res) => {
  try {
    await repositoryService.deleteOneAsync(req.params.id);
    res.status(200).json({ message: "Account deleted" });
  } catch (error) {
    console.error("Ошибка при удалении:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});



export default router;
