FROM node:14

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm install typescript -g
RUN npm run build

EXPOSE 8080
CMD ["npm", "start"]