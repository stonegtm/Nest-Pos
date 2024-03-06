FROM node:18

RUN npm i -g @nestjs/cli

COPY package.json .

RUN npm install

COPY . .

CMD ["nest", "start"]