import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from '@epmicro/common';
import swaggerUi from 'swagger-ui-express';
import swaggerConf from './swagger';
import { BasketController } from './Controllers/basketController';
const redis = require('redis');

const server = express();
if (!process.env.REDIS_URL) throw new Error('Missing REDIS_URL');
const redisCache = redis.createClient({
  url: `redis://${process.env.REDIS_URL}`,
});
redisCache.on('error', (err: any) => console.log('Redis Client Error', err));

const basketController = new BasketController();
server.set('trust proxy', true);
server.use(json());
server.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerConf));
server.use('/', basketController.router);

server.all('*', async (req, res) => {
  throw new NotFoundError();
});

server.use(errorHandler);

export { server, redisCache };
