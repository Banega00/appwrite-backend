## Description

This project is a backend server built with NestJS, designed to provide robust and scalable APIs for managing and interacting with users and their reservations. The server seamlessly integrates with Appwrite BaaS to leverage its features for database management, authentication, and others.

[![Icons](https://skillicons.dev/icons?i=nestjs)](https://skillicons.dev)
[![Icons](https://skillicons.dev/icons?i=appwrite)](https://skillicons.dev)

## Setup
### 1. Install dependencies
```bash
$ npm install
```
### 2. Setup Appwrite project
Appwrite can be selfhosted service (you can deploy it by pulling its docker image) or also be used in [Appwrite cloud](https://cloud.appwrite.io/).
Once you setup a project in Awpprite you will get the necessary credentials to use it.

### 3. Set Appwrite environment variables
```
# these are tree required environment variables for server to connect to appwrite and run properly
APPWRITE_ENDPOINT=
APPWRITE_PROJECT_ID=
APPWRITE_API_KEY=
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
