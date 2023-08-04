import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import 'dotenv/config';

import auth_route from './routes/auth';

import { notFound } from './middlewares/notfoundMiddleware';
import { errorHandler } from './middlewares/errorHandlerMiddleware';
import helmet from 'helmet'
import cookieParser from 'cookie-parser';

const port = process.env.PORT || 3000;
const app = express();

require('dotenv').config({});

app.use(helmet())
app.use(cors());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended : false }));



app.get('/', (req : Request, res : Response) => {
  res.json({
    message: 'Home page',
  });
});

app.use('/auth', auth_route);

app.use((req: Request, res: Response, next) => {
  req.cookies && console.log('Cookies loaded :', req.cookies);
  next();
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});
