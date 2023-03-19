import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from '@epmicro/common';
import swaggerUi from 'swagger-ui-express';
import swaggerConf from './swagger';
import { DiscountController } from './Controllers/discountController';

const server = express();

const discountController = new DiscountController();
server.set('trust proxy', true);
server.use(json());
server.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerConf));
server.use('/', discountController.router);

server.all('*', async (req, res) => {
  throw new NotFoundError();
});

server.use(errorHandler);

export { server };
