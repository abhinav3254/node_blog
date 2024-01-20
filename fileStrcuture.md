# Project Structure

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
