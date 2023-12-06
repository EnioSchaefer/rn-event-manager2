import express, { Request, Response } from 'express';
import cors from 'cors';
import User from './database/models/UserModel';
import UserRoutes from './routes/UserRoutes';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/status', (req: Request, res: Response) => {
  try {
    return res.status(200).send('Api is OK');
  } catch (error) {
    return res.status(500).json(error);
  }
});

app.use('/users', UserRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
