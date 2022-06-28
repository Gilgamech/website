FROM node:13-alpine

ENV PORT=80

RUN mkdir -p /home/app

COPY . /home/app

CMD ["node","/home/app/index.js"]