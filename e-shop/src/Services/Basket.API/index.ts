import { server } from './server';

const start = async () => {
  server.listen(80, () => {
    console.log('Catalog Service Running on 8000');
  });
};

start();
