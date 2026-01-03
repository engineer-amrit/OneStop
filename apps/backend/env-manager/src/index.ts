import express from 'express';
import { env } from './config/env.js';
import router from './routes/index.js';
import { ErrorHandler } from '@utils/api';
import { errorLogger } from './utils/logger.js';

const app = express();


app.use(express.json());
app.use(router);

const errorHandler = new ErrorHandler(env, errorLogger);
app.use(errorHandler.middleware);


app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT} in ${env.NODE_ENV} mode.`);
});