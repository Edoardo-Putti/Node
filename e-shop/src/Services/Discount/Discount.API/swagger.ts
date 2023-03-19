import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Discount API',
      version: '1.0.0',
      description: 'an API to manage and retrieve an e-shop discount catalog',
    },
    basePath: 'e-shop\\src\\Services\\Discount.API',
  },
  servers: [
    {
      url: 'http://localhost:8002',
      description: 'Local server',
    },
  ],
  apis: ['./Controllers/*.ts'],
};

const openapiSpecification = swaggerJsdoc(options);

export default openapiSpecification;
