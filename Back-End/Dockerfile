FROM node:18-alpine
WORKDIR / nodeProj
COPY package*.json ./
RUN pnpm install --production && pnpm cache clean --force
COPY ./src .
EXPOSE 7000
CMD ["node", "index.js"]