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
Appwrite can be selfhosted service (you can deploy it by pulling its docker image) or can also be used in [Appwrite cloud](https://cloud.appwrite.io/).
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
## Open API specifications
This project implements the OpenAPI Specification (OAS3) using Swagger, providing a standardized and interactive API documentation. The OpenAPI spec is available at `<server_url>/api`.

## Postman request collection
[![Icons](https://skillicons.dev/icons?i=postman)](https://skillicons.dev)
For purpose of developing this application Postman client has been used. If you want to test all endpoints from Postman you can import my request collection to have a starting boilerplate. It is in form of JSON file located in root folder of this project named: `Appwrite_backend_collection.postman_collection.json`

## NestJS documentation with Compodoc

NestJS documentation for this project is generated using compdoc documentation tool which is specifically designed for documenting Angular and NestJS projects. It generates static documentation for NestJS project, offering a comprehensive view of the application's structure, including modules, components, services, controllers, and more.

In order to open this documentation just run `npx compodoc -s`. This command will start a local server, and you can access the documentation by navigating to http://localhost:8080 in your web browser.

## Project components

NestJS follows modular architecture for designing different application components

### Main modules
#### 1. Auth
This module is designed to handle authentication related operations within this NestJS server. Its auth controller primarily supports two key functionalities:
    
- **login** - creates an anonymous session and stores session details in JWT encoded string which is transported via auth_token cookie
- **register** - upgrades an anonymous session to a registered session by adding real user data.

#### 2. User
This module contains a controller for user related operations like fetching user's data

#### 3. Reservation
This module intended for managing reservations of a user. It has two main functionalities to create a new reservation and retrieve all reservations of a user.

### Integrations
Trough dedicated Appwrite module this NestJS server is connected with Appwrite service and utilizes its database and authentication features.

### Util components
Most utility components are stored and imported trough shared module because they are required in different parts of the application
#### 1. Config service
is designed to centralize and simplify access to application configuration settings, such as environment variables and predefined configurations for development, testing, and production environments. It provides methods to retrieve specific configuration values like database IDs, Appwrite API settings, and global configurations like the application's host and port.

#### 2. Context service
is designed to facilitate the storage and retrieval of context-specific data (like session secrets, user information, and timestamps) across different parts of an application using the ClsService from nestjs-cls, ensuring that data remains isolated to each request or execution context.

#### 3. Global Exception Filter
is designed to catch and handle all unhandled exceptions across the entire application. It standardizes the response structure for errors, ensuring a consistent error response format for clients. Additionally, it can log errors for debugging and monitoring purposes, and it allows for the customization of error handling

#### 4. Session guard
The SessionGuard, specifically the AppwriteSessionGuard class within the session.guard.ts file, is a custom guard in a NestJS application designed to manage session-based authentication and authorization. It extracts JWT encoded token from auth_token and fetches user based on session that corresponds to that token.

#### 5. Request logging interceptor & middleware
This project uses an interceptor and middleware to log the start and end of HTTP requests, including the method, URL, and response status code, as well as the time taken to process the request, thereby aiding in monitoring and debugging the application's HTTP traffic. These services also have a purpose to attach unique request id in order to enhance logs traceability and help to isolated them on request level.

#### 6. Logger service
is designed to provide a centralized and consistent logging mechanism for an application. It abstracts the complexity of logging by offering a simple interface to record various levels of information (e.g., debug, info, warning, error), enabling developers to track application behavior, diagnose issues, and monitor performance across different environments.

## Project architecture
This project follows the standardized 3-Tier NestJS architecture approach.
1. Controllers - This layer is responsible for handling incoming HTTP requests, processing user inputs, and returning the appropriate HTTP responses
2. Services - This layer contains the core business logic and rules of the application. 
3. Repositories (Data access layer) - This layer is responsible for interacting with the database. Repositories provide an abstraction over data access, encapsulating the logic required to query and persist data. Specifically for this project repository layer uses appwrite service to implement data storing and retrieval.