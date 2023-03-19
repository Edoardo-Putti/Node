import { server, redisCache } from './server';

const start = async () => {
  try {
    await redisCache.connect();
    console.log('connected to redis');
  } catch (error) {
    console.log('error trying connect to redis');
  }

  server.listen(80, () => {
    console.log('Catalog Service Running on 8000');
  });
};

start();
