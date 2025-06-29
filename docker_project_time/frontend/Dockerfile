FROM node:alpine
WORKDIR /app
EXPOSE 3000
COPY package*.json ./
RUN pnpm install
COPY . ./
CMD ["pnpm", "run", "dev"]