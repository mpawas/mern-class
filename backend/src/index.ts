import 'dotenv/config';

import express, { type Express, type Request, type Response } from 'express';
import bodyParser from 'body-parser';
import connectDb from './modules/config/db';
import userRoutes from './modules/user/routes';
import { dot } from 'node:test/reporters';
import { clear } from 'node:console';
import authRoutes from './modules/auth/routes';
import errorMiddleware from './modules/middleware/globalErrorMiddleware';

const app: Express = express();

app.use(bodyParser.json({ strict: false }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

const port = 3010;

app.use(
  '/user',

  userRoutes,
);

app.use(
  '/auth',

  authRoutes,
);

app.use('/health', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(errorMiddleware);

const server = async () => {
  await connectDb();
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};
void server();
export default app;
