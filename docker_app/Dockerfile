# FROM node:18-alpine
# WORKDIR / node-app
# COPY . .
# EXPOSE 3000
# CMD ["node", "index.js"]


FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 7000
CMD ["pnpm", "start"]