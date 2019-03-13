# [![Auxilium](assets/AuxiliumLogo.png)](https://overt.dev)

Auxilium is an open-source app for reporting emergencies. It informs nearby users that someone around them is in danger, and provides them with your location (and directions), so you can get help quickly.

## Motivation

In [my country](https://en.wikipedia.org/wiki/Nigeria), many people die because of inability to access help quickly when they are involved in accidents or emergencies. I've always believed that many of these mortalities could have been averted, if people around would ave come to their aid.

## Project Phase

This project is currently in *pre-launch*, being developed by [Oluwakorede
Fashokun](https://github/com/korede360).

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
  - Dashboard
    - Library: [React](https://facebook.github.io/react) based on [Create React App](https://facebook.github.io/create-react-app)
- Back-End
  - Framework: [Express](https://expressjs.com)
  - Database: [MongoDB](https://mongodb.com)
  - Hosting: [Heroku](https://heroku.com)
  - Websockets: [Socket.iO](https://socket.io)

## License

MIT License

## Author

Oluwakorede Fashokun <koredefashokun@gmail.com> for [Overt](https://overt.dev)
