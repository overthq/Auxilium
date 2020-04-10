# Auxilium App

This folder contains the mobile app client for Auxilium.

## Commands

The following are the important commands needed during development:

```sh
# Start the Expo server
yarn start -c
```

## Folder Structure

```
- src
  | api (functions that call the Auxilium API)
  | components (application components)
  | contexts
  | helpers
  | redux (Domain-scoped reducers, actions and types)
  | screens (application screens)
  - Root.tsx
- App.tsx (application root file, mostly contains providers).
```

## Technologies

This app is built with [React Native](https://reactnative.dev) and [Expo](https://expo.io).
