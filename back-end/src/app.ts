import express, { Request, Response } from 'express';
import cors from 'cors';
import User from './database/models/UserModel';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.get('/users', async (_req: Request, res: Response): Promise<Response<User[]>> => {
  const result = await User.findAll();

  return res.status(200).json(result);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
