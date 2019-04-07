# [![Auxilium](assets/AuxiliumLogo.png)](https://overt.dev)

<p align="center">
  <a href="https://circleci.com/gh/overthq/Auxilium">
    <img src="https://circleci.com/gh/overthq/Auxilium.svg?style=svg" alt="CircleCI" />
  </a>
</p>

Auxilium is an open-source app for reporting emergencies. It informs nearby users that someone around them is in danger, and provides them with your location (and directions), so you can get help quickly.

## Motivation

In [my country](https://en.wikipedia.org/wiki/Nigeria), many people die because of inability to access help quickly when they are involved in accidents or emergencies. I've always believed that many of these mortalities could have been averted, if people around would ave come to their aid.

## Project Phase

This project is currently in _pre-launch_, being developed by [Oluwakorede Fashokun](https://github/com/korede360) for [Overt](https://overt.dev), a concept that creates open-source apps to solve many of the worlds problems. You can read more [here](https://medium.com/@koredefashokun/building-the-future-in-the-open-f3ac035fb412)

## Installation

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
# Start the entire project
yarn lerna run start
```

## Contributing

All forms of (positive) contribution is welcome to Auxilium. Be sure to check out the [contribution guidelines](.github/CONTRIBUTING.md) before contributing.

## Tech Stack

Overt is a JavaScript-based application. It is built with popular JS libraries/frameworks like React, React Native and Express. Here's what the stack looks like.

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
  - WebSockets: [Socket.IO](https://socket.io)

## License

MIT License

## Author

Oluwakorede Fashokun <koredefashokun@gmail.com> for [Overt](https://overt.dev)
