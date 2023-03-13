FROM node:alpine

WORKDIR /app
COPY Services/Catalog.API/package.json .
RUN npm install --only=prod
COPY Services/Catalog.API/. .

CMD ["npm", "start"]