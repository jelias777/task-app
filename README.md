# Task Manager Application

Example of a node.js application using express, MongoDB and JWT

## Requirements

- node.js 12.*
- npm 6.*

## Dependencies

- bcryptjs 2.4.3
- express 4.17.1
- jsonwebtoken 8.5.1
- mongodb 3.5.6
- mongoose 5.9.10
- multer 1.4.2
- sharp 0.25.2
- validator 13.0.0

## Building

Install the dependencies before start:

```sh
$ cd node-mongodb-jwt
$ sudo npm install
```
## Before Start

Inside the folder config set the following environment variables:

- PORT: Is the port 
- JWT_SECRET: Is the secret key used to authenticate
- MONGODB_URL: Is the url connection to Mongo DB

## Run the Application

Development

```sh
$ npm run dev
```

or use

```sh
$ npm start
```