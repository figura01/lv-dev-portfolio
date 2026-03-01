FROM node:18-slim

WORKDIR /app

# 👇 AJOUTER ÇA
RUN apk add --no-cache openssl

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build

CMD ["npm", "start"]
