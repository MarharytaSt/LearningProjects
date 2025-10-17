import express from 'express';
import cors from 'cors';
import receiptRouter from './routes/receiptRouter.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/api/receipt', receiptRouter);



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})