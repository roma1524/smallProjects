FROM node:18-alpine

WORKDIR /index

COPY package*.json ./

RUN npm install --production && npm cache clean --force

COPY . .

EXPOSE 7000

CMD ["node", "dist/index.js"]