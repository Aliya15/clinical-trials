# ClinicalTrials

## High-level overview

I've used modular architecture for the project.

### Project Structure

#### `modules` directory

In this directory is located the one and only page/module for this assignment.
The `trials-list` module contains components, services and other entities with business logic that is specific to this module.

`trials-list` modules has its own routes defined inside and is defined as a lazy-loaded route in `app.routes.ts`.

#### `shared` directory

The shared directory contains only reusable entities, without any business logic.


#### `app.component.{ts/html/css}`

This component has only router outlet inside without any knowledge of what would be shown inside.


### Used Libraries

- `prettier` and `eslint` for code formatting and linting, to keep the code clean and consistent
- `@angular/material` - used table, buttons, icons and header components

## How to run the project

As a prerequisite, execute `npm install` in the root of the project.

### Useful commands
- Execute `npm run start` to start the dev server
- Execute `npm run lint` to check the linting of the project
- Execute `npm run test` to run the unit tests
