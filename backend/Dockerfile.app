FROM node:latest

# Create app directory
WORKDIR /usr/app

COPY ./package*.json ./
RUN npm install

COPY . .

# Gerar Prisma Client
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "start"]
