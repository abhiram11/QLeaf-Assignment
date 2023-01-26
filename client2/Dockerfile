FROM node:alpine

WORKDIR /usr/app/client

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

# Make stages for build and deploy using commands such as:
# RUN npm build

CMD ["npm", "start"]
# CMD ["npx", "serve", "build"]

# docker build -t frontend .
# docker run -it -p 3000:3000 frontend