import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Basket API',
      version: '1.0.0',
      description: 'an API to manage and retrieve an e-shop users baskets',
    },
    basePath: 'e-shop\\src\\Services\\Basket.API',
  },
  servers: [
    {
      url: 'http://localhost:8000',
      description: 'Local server',
    },
  ],
  apis: ['./controllers/*.ts'],
};

const openapiSpecification = swaggerJsdoc(options);

export default openapiSpecification;
