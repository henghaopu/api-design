import express, { Express, Request, Response, NextFunction } from 'express';
import router from './router';
import morgan from 'morgan';
import cors from 'cors';
import { protect } from './modules/auth';
import { createNewUser, signInUser } from './handlers/user';

const app: Express = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello' });
});

app.post('/signup', createNewUser);
app.post('/signin', signInUser);
app.use('/api', protect, router);

app.use((err, req, res, next) => {
  if (err.type === 'auth') {
    res.status(410).json({ message: 'unauthorized' });
  } else if (err.type === 'input') {
    res.status(400).json({ message: 'invalid input' });
  } else {
    res.status(500).json({ message: 'Oops, thats on us' });
  }
});

export default app;
