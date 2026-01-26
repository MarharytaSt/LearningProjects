import express from 'express';
import cors from 'cors';
import splitwiseRouter from './routes/splitwiseRouter.js';

const app = express();
const PORT = 5000;



app.use(cors());
app.use(express.json());
app.use('/', splitwiseRouter);

app.get("/test", (req, res) => {
  res.json({ message: "Backend working!"});
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
})
