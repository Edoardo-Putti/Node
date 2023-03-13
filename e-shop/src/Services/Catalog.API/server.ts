import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from '@epmicro/common';
import swaggerUi from 'swagger-ui-express';
import swaggerConf from './swagger';
import { CatalogController } from './controllers/catalogController';

const server = express();
const catalogController = new CatalogController();
server.set('trust proxy', true);
server.use(json());
server.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerConf));
server.use('/', catalogController.router);

server.all('*', async (req, res) => {
  throw new NotFoundError();
});

server.use(errorHandler);

export { server };
