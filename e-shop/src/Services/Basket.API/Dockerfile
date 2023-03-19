FROM node:alpine

WORKDIR /app
COPY Services/Basket.API/package.json .
RUN npm install --only=prod
COPY Services/Basket.API/. .

CMD ["npm", "start"]