FROM node:alpine

WORKDIR /app
COPY Services/Discount/Discount.API/package.json .
RUN npm install --only=prod
COPY Services/Discount/Discount.API/. .

CMD ["npm", "start"]