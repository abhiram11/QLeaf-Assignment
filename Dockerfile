FROM node:alpine

WORKDIR /usr/app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3001

CMD ["node", "src"]

# docker build -t backend .
# docker run -it -p 3001:3001 backend