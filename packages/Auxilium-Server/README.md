# Auxilium Server

This is Auxilium's backend API. This currently provides the features that Auxilium is based on like user identification and emergency creation, fetching and (soon) notification.

## Getting Started

### Environment Variables

To set up this server on your machine, create a .env file in this directory (Auxilium-Server), and add the following variables.

| Variable             | Description                        |
| -------------------- | ---------------------------------- |
|	PORT								 | Port number for server to run on   |
| DB_URI               | MongoDB database connection string |

### Starting the Server

Before starting the server, make sure your local (or remote) MongoDB server is running. Then run `yarn dev` in the server directory. This should start the server on `http://localhost:4000`. Note that using port 4000 is mandatory, as it is hardcoded as the development endpoint in the `Auxilium-App` package (So you have a server to use during app development).

### Writing and Running Tests

We currently write tests for the server using [Mocha](https://mochajs.org) and [Chai](https://www.chaijs.com). All tests live in the `tests` folder.

#### When should I write a test?

We currently write tests for every server controller and helper functions. You should write a test when you create a new controller (or endpoint) or helper on the API.

#### Writing tests

Be sure to look at the patterns used in writing previous tests. We currently use the `async/await` pattern to make asynchronous calls to the server and `try/catch` to handle errors. Also make sure that the description of each suite is easy to understand. Write tests for as many edge cases as you can imagine.

#### Running tests

Tests can be run by running `yarn test` in this folder. Note that your local MongoDB database should be running for the app to successfully execute the tests.