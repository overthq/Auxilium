# Auxilium Server

This is Auxilium's backend API. This currently provides the features that Auxilium is based on like user identification and emergency creation, fetching and (soon) notification.

## Getting Started

### Environment Variables

To set up this server on your machine, create a .env file in this directory (Auxilium-Server), and add the following variables.

| Environment Variable | Description                        |
| -------------------- | ---------------------------------- |
|	PORT								 | Port number for server to run on   |
| DB_URI               | MongoDB database connection string |

### Starting the Server

Before starting the server, make sure your local (or remote) MongoDB server is running. Then run `yarn dev` or `npm run dev` in the server directory. This should start the server on `http://localhost:4000`. Note that using port 4000 is mandatory, as it is hardcoded as the development endpoint in the `Auxilium-App` package (So you have a server to use during app development).
