# Cypress Heroes Demo Application

This is a demo application that shows how to use Cypress to run end-to-end,
component, and API tests against an application.

## Getting Started

The app is a mono repo that uses npm workspaces. Once you clone the project,
install the dependencies at the root folder:

```sh
npm install
```

After that a few more things need to be set up (databases and such), to do so run:

```sh
npm run setup
```


To launch the app for development, run:

```sh
npm run dev
```

This will start both the client and server apps in dev mode. The site will be
available at http://localhost:3000.

## App Overview

The Cypress Heroes app consists of a frontend client app written in React that
uses Vite, as well as a backend app that uses NestJS.

### React Client App

The React client app is located in the **client** folder. It is a standard React [Vite](https://vitejs.dev/) app.

Todo: fill out

### NestJS Server App

The server app is in the **server** folder. It is built with the [NestJS](https://nestjs.com/) Node.js framework. It uses [Prisma](https://www.prisma.io/) for the database ORM.

#### Database seeding and resetting

The database is seeded from the **server/prisma/seed.ts** script when you set up the app. If at any time you want to reset the database back to its initial state, run:

```sh
npm run resetdb
```

## Environment Variables

The client app uses an environment variable to know what the URL is for the
backend api named `VITE_API_URL`. It defaults to "http://localhost:3001" for use
in dev mode, and should be overriden in other environments/modes.

## Running Tests

The Cypress tests for this project are stored under `client/cypress`.

- `client/cypress/e2e/` contains the end-to-end specs.
- `client/cypress/pages/` contains page objects used by the tests.
- `client/cypress/docs/` contains test case documentation and bug reports.

### Setup

1. Install dependencies at the root:

```sh
npm install
```

2. Run the setup script to prepare the database and environment:

```sh
npm run setup
```

3. Start the app in development mode:

```sh
npm run dev
```

The client should be available at `http://localhost:3000` and the API at `http://localhost:3001`.

### Run Cypress tests

From the repository root, open Cypress with:

```sh
npx cypress open
```

Then choose the E2E spec file from the UI.

To run the tests in headless mode, use:

```sh
npx cypress run --config-file client/cypress.config.js
```

If the test configuration uses a custom Cypress file inside `client/`, replace the path accordingly.
