# [![Auxilium](assets/AuxiliumLogo.png)](https://overt.dev)

<p align="center">
  <a href="https://circleci.com/gh/overthq/Auxilium">
    <img src="https://circleci.com/gh/overthq/Auxilium.svg?style=svg" alt="CircleCI" />
  </a>
</p>

Auxilium is an open-source app for reporting emergencies. It informs nearby users that an emergency has occured in their vicinity, and provides them with the location (and directions), to keep them informed, and take neccessary actions.

## Motivation

In [my country](https://en.wikipedia.org/wiki/Nigeria), many people die because of inability to access help quickly when they are involved in accidents or emergencies. I've always believed that many of these mortalities could have been averted, if people around would have come to their aid.

## Project Phase

This project is currently in the _pre-launch_ phase, being developed by [Oluwakorede Fashokun](https://github/com/koredefashokun) for [Overt](https://overt.dev), a concept that creates open-source software to solve many of the problems we face in the world. You can read more [here](https://medium.com/@koredefashokun/building-the-future-in-the-open-f3ac035fb412), or follow Overt on Twitter [here](https://twitter.com/overt_hq).

## Installation

This section will help you get Auxilium up and running in your development environment.

### Prerequisites

Before starting installing, the following are required:

- [Node.js](https://nodejs.org) (version 8 or higher).
- [Yarn](https://yarnpkg.com) (preferred package manager)
- [MongoDB](https://mongodb.com) (database for local development)

### Commands

To install Auxilium on your machine, run these commands:

```sh
# Clone the repository
git clone https://github.com/overthq/Auxilium

# Move into the project directory
cd Auxilium

# Install general dependencies
yarn

# Install required dependencies
yarn lerna bootstrap

# SERVER-SIDE (Be sure to read the Auxilium-Server docs)

# Start MongoDB (in a seperate terminal)
mongod

# Start the backend server (after including the necessary vars in the server's .env file)
cd packages/Auxilium-Server
yarn dev

# CLIENT-SIDE

# Start the Expo app
cd packages/Auxilium-App
expo start

```

## Contributing

All forms of (positive) contribution is welcome to Auxilium. Be sure to check out the [contribution guidelines](.github/CONTRIBUTING.md) before contributing.

## Tech Stack

Auxilium is a JavaScript-based application. It is built with popular JS libraries/frameworks like React, React Native and Express. Here's what the stack looks like.

- Front-End
  - Mobile App
    - Framework: [React Native](https://facebook.github.io/react-native) based on [Expo](https://expo.io)
    - Database: [SQLite](https://sqlite.org) (stores data on the front-end)
  - Dashboard
    - Library: [React](https://facebook.github.io/react) based on [Create React App](https://facebook.github.io/create-react-app)
- Back-End
  - Framework: [Express](https://expressjs.com)
  - Database: [MongoDB](https://mongodb.com)
  - Hosting: [Heroku](https://heroku.com)
  - WebSockets

We also use [Lerna](https://lernajs.io) to manage the monorepo structure, and [CircleCI](https://circleci.org) for continuous integration/deployment (CI/CD)

## License

MIT License

## Author

Oluwakorede Fashokun <korede@overt.dev> for [Overt](https://overt.dev).
