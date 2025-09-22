FROM node:20-alpine AS build
WORKDIR /app
COPY app/package*.json ./
RUN npm ci --only=production
COPY app/ .

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app /app
EXPOSE 3000
CMD ["node","server.js"]
