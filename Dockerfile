FROM node:20-alpine AS builder

WORKDIR /app

# 👇 AJOUTER ÇA
RUN apk add --no-cache openssl

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build
