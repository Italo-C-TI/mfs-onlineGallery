FROM node:14

WORKDIR /app

COPY . .

RUN npm install typescript -g
RUN tsc

EXPOSE 80

CMD ["node", "dist/app.js"]