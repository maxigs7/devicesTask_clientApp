# Ninja RMM - Client App

This project was built as part of a technical interview process. Building a CRUD application of devices from scratch. Having the ability of
filtering and sorting the list of devices and applying all my react knowledge and best practices.

## Development

### Run Locally

You can configure the application port and api url from env variable. Please follow the next instructions to get the app working on your
local environment:

1. Copy `.env.example` as `.env.development`:

```bash
cp .env.example .env.development
```

2. Install dependecies:

```bash
yarn install
```

3. Before running the client application we need to run the backend project in order to get it working smoothly. Clone
   [this server repository](https://github.com/NinjaRMM/devicesTask_serverApp) and keep the instructions.

4. Just run the app:

```
yarn start
```

### Project Structure

Here you find the folders structure that we use:

    ./src
    ├── components  # Presentational/dumb components
    ├── containers  # Container components, managing async logic, etc.
    ├── hooks       # Custom hooks
    ├── providers   # Custom providers/context
    └── shared      # Helpers, common logic, configuration file, etc.

## Production

Builds the app for production to the `./build` folder. It correctly bundles React in production mode and optimizes the build for the best
performance.

The build is minified and the filenames include the hashes. Your app is ready to be deployed!

Use this command for building:

```
yarn build
```

## Libraries

This project was built using these 3rd party libraries:

- react-select
- react-hook-form
