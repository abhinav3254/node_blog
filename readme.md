# Project Name

Blog Application

[Project Structure](fileStrcuture.md)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Contributing](#contributing)
- [License](#license)
- [Project Structure](fileStrcuture.md)
- [Acknowledgments](#acknowledgments)

## Introduction

Provide a concise introduction to your project. Mention the purpose, goals, and any relevant background information.

## Features

Highlight the key features of your project. Enumerate the functionalities that users can expect.

## Getting Started

Include instructions on how to get the project up and running on a local machine.

### Prerequisites

Certainly! Here's an updated list with download links for the mentioned prerequisites:

### Prerequisites

1. **Node:**
   - Download and install Node.js from [here](https://nodejs.org/).

2. **Express:**
   - Install Express using the following command in your project folder:
     ```bash
     npm install express
     ```

3. **JavaScript:**
   - JavaScript is a scripting language and doesn't require separate installation as it's supported by web browsers. Ensure you have a modern browser that supports JavaScript.

4. **PostgreSQL:**
   - Download and install PostgreSQL from [here](https://www.postgresql.org/download/).

5. **jsonwebtoken:**
   - Install the `jsonwebtoken` package using the following command in your project folder:
     ```bash
     npm install jsonwebtoken
     ```

Make sure to run the `npm install` commands in your project directory, where your `package.json` is located, to install the required packages locally.


### Installation

Provide step-by-step instructions for installing the necessary dependencies and setting up the project.

```bash
# Clone the repository
git clone https://github.com/abhinav3254/blog_node.git

# Change into the project directory
cd blog_node

# Install dependencies
npm install
```

## Usage

Explain how to use your project. Provide examples or code snippets to guide users through common use cases.

## API Endpoints

List and describe the available API endpoints. Include details such as HTTP methods, request/response formats, and any required parameters.

Certainly! Below are full examples for the described API endpoints:

### POST /login

- **Description:** Log in a user.
  
- **Request:**
  - Method: POST
  - Endpoint: `/login`
  - Headers:
    - Content-Type: application/json
  - Body:
    ```json
    {
      "username": "example_user",
      "password": "example_password"
    }
    ```

- **Response:**
  - Status: 200 OK
  - Body:
    ```json
    {
      "success": true,
      "message": "Login successful",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```
  - Status: 401 Unauthorized
  - Body:
    ```json
    {
      "success": false,
      "message": "Login failed"
    }
    ```

### POST /signup

- **Description:** Register a new user.

- **Request:**
  - Method: POST
  - Endpoint: `/signup`
  - Headers:
    - Content-Type: application/json
  - Body:
    ```json
    {
      "name": "John Doe",
      "age": 25,
      "phone_number": "1234567890",
      "email": "john.doe@example.com",
      "username": "john_doe",
      "gender": "male",
      "password": "secure_password"
    }
    ```

- **Response:**
  - Status: 200 OK
  - Body:
    ```json
    {
      "success": true,
      "message": "Signup successful",
      "result": {
        "id": 1,
        "name": "John Doe",
        "age": 25,
        "phone_number": "1234567890",
        "email": "john.doe@example.com",
        "username": "john_doe",
        "gender": "male",
        "password": "secure_password"
      }
    }
    ```
  - Status: 400 Bad Request
  - Body:
    ```json
    {
      "success": false,
      "message": "All fields are required"
    }
    ```

### GET /test

- **Description:** Test endpoint requiring JWT authentication.

- **Request:**
  - Method: GET
  - Endpoint: `/test`
  - Headers:
    - Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

- **Response:**
  - Status: 200 OK
  - Body:
    ```json
    {
      "success": true,
      "message": "JWT authentication is working",
      "user": {
        "username": "example_user"
      }
    }
    ```
  - Status: 401 Unauthorized
  - Body:
    ```json
    {
      "success": false,
      "message": "Unauthorized: No token provided"
    }
    ```
  - Status: 403 Forbidden
  - Body:
    ```json
    {
      "success": false,
      "message": "Forbidden: Invalid token"
    }
    ```

## Authentication

Explain the authentication mechanism used in your project. Describe how users can obtain and use authentication tokens (JWTs).

## Contributing

Provide guidelines for contributors. Include information on how to report issues, submit feature requests, and contribute to the development of the project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.


## Project Structure

This project follows a structured organization to enhance code readability and maintainability. Below is a breakdown of the key folders and files in the project:

- **index.js**: The entry point of the application.

- **src folder**: The main source code directory.

    - **controller**: Contains modules responsible for handling HTTP requests and responses. Controllers act as intermediaries between routes and business logic.

    - **db**: Houses modules related to database connectivity and configuration.

    - **dto**: Stands for Data Transfer Object. It contains modules defining structures for data exchange between different layers of the application.

    - **middleware**: Contains reusable middleware functions that can be applied to routes to perform specific tasks.

    - **repository**: Modules responsible for database operations. They interact directly with the database to retrieve or manipulate data.

    - **service**: Houses business logic modules. Services encapsulate the application's core functionalities.

- **.gitignore**: Specifies files and directories that should be ignored by Git.

- **jwt.md**: Documentation or information related to JSON Web Tokens (JWT).

- **LICENSE.md**: Contains licensing information for the project.

- **package-lock.json**: Automatically generated file based on the exact versions of dependencies installed in the project.

- **package.json**: Configuration file that holds metadata and dependencies information for the Node.js project.

- **query.sql**: SQL queries or database schema definitions.

- **readme.md**: This file! A documentation file providing an overview of the project's structure and purpose.



## Acknowledgments

- [npm](https://www.npmjs.com/)
- [Medium](https://medium.com/)
- [Node.js](https://nodejs.org/en)
- [Express.js](https://expressjs.com/)
