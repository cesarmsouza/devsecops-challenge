FROM node:20-alpine AS build
WORKDIR /app
COPY app/package*.json ./
RUN npm install --omit=dev
COPY app/ .

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app /app
EXPOSE 3000
CMD ["node","server.js"]
