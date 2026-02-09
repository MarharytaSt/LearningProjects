import express from 'express';
import repositoryService from '../services/repository.js';
import { ObjectId } from 'mongodb';
import {recalculateAccount} from '../services/calcLogic.js';



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

// Transactions

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

  if (!Array.isArray(user.transactions)) {
    user.transactions = [];
  }

  user.transactions.push({
    _id: new ObjectId().toString(),
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

  recalculateAccount(account);
  await repositoryService.updateOneAsync(id, account);

  res.status(200).json(account);
});

router.delete('/accounts/:id/transactions/:transactionId', async (req, res) => {
  const { id, transactionId } = req.params;

  const account = await repositoryService.findOneAsync(id);
  if (!account) {
    return res.status(404).json({ message: "Account not found" });
  }

  let deleted = false;

  for (const participant of account.participants) {
    const before = participant.transactions.length;

    participant.transactions = participant.transactions.filter(
      t => t._id !== transactionId
    );

    if (participant.transactions.length !== before) {
      deleted = true;
    }
  }

  if (!deleted) {
    return res.status(404).json({ message: "Transaction not found" });
  }

  const allTransactions = account.participants.flatMap(
    p => p.transactions || []
  );

  account.total = allTransactions.reduce(
    (sum, t) => sum + (t.amount || 0),
    0
  );

  recalculateAccount(account);
  await repositoryService.updateOneAsync(id, account);

  res.status(200).json({ message: "Transaction deleted!" });
});

router.put('/accounts/:id/transactions/:transactionId', async (req, res) => {
  const { id, transactionId } = req.params;
  const { participant, amount, date } = req.body;

  const account = await repositoryService.findOneAsync(id);
  if (!account) {
    return res.status(404).json({ message: "Account not found!" });
  }

  let updated = false;

  for (const p of account.participants) {
    for (const t of p.transactions || []) {
      if (t._id === transactionId) {
        t.amount = Number(amount);
        t.date = new Date(date).toISOString();

        if(p.name !== participant) {
          p.transactions = p.transactions.filter(x => x._id !== transactionId);
          
          const newUser = account.participants.find(x => x.name === participant);
          if (!newUser) {
            return res.status(400).json({message: "Participant not found!"});
          }

          if(!Array.isArray(newUser.transactions)) newUser.transactions = [];
          newUser.transactions.push(t);
        }

        updated = true;
      }
    }
  }

  if(!updated) {
    return res.status(404).json({message: "Transaction not found!"});
  }

   const allTransactions = account.participants.flatMap(
    p => p.transactions || []
  );

  account.total = allTransactions.reduce(
    (sum, t) => sum + (t.amount || 0),
    0
  );

  recalculateAccount(account);
  await repositoryService.updateOneAsync(id, account);

  res.status(200).json({message: "Transaction updated!", account});
})

export default router;
