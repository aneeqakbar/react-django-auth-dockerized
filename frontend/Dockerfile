FROM node:18-alpine
WORKDIR /app/frontend
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
EXPOSE 3000