FROM node:18

RUN \
    mkdir /var/log/server && \
    touch /var/log/server/app.log

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 5000

CMD ["npm", "start"]