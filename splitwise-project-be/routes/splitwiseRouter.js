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

router.post('/accounts/:id/transactions', async (req, res) => {
  const { id } = req.params;
  const { participant, amount } = req.body;

  const account = await repositoryService.findOneAsync(id);

  if (!account) {
    return res.status(404).json({ message: "Account not found" });
  }

  const user = account.participants.find(p => p.name === participant);

  if (!user) {
    return res.status(400).json({ message: "Participant not found" });
  }

  if(!Array.isArray(user.transactions)) {
    user.transactions = [];
  }

  user.transactions.push({
    amount: Number(amount),
    date: new Date().toISOString()
  });

  const allTransactions = account.participants.flatMap(
    p => p.transactions || []
  );

  account.total = allTransactions.reduce(
    (sum, t) => sum + (t.amount || 0),
    0
  );

  await repositoryService.updateOneAsync(id, account);

  res.status(200).json(account);
});


export default router;
