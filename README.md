# Mini-Meco

Mini-Meco is a web application that provides agile tooling for teams to enhance their productivity and streamline their workflow. 

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
  - [Frontend](#frontend)
  - [Backend](#backend)

## Installation

Before you start, ensure you have [Node.js](https://nodejs.org/) installed on your machine. This project uses both a client-side (frontend) and server-side (backend) application, which need to be set up separately.

### Frontend

To set up the frontend, follow these steps:

1. Navigate to the `client` directory:
    ```bash
    cd client
    ```

2. Install the necessary dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm run dev
    ```

This will start the frontend on your local machine, typically at `http://localhost:3000`.

### Backend

To set up the backend, follow these steps:

1. Navigate to the `server` directory:
    ```bash
    cd server
    ```

2. Compile the TypeScript files to JavaScript:
    ```bash
    tsc
    ```

3. Start the server:
    ```bash
    node dist/server.js
    ```

This will start the backend server, typically at `http://localhost:5000`.


