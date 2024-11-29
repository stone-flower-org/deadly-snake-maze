# Deadly Snake Maze

## Description

Deadly Snake Maze is a 3D browser game written using Three.js

## Installation

### Using Docker

#### Requirements

Docker: ^20

GNU bash: ^3.2

OS: macOS, Linux

#### Steps

1. Open terminal and go to project's folder
2. Run `./scripts/docker-build.sh` to build image
3. Run `CONFIGS_PATH=/path/to/configs ./scripts/docker-run.sh` to run container (see desc, how to set custom port and configs)
4. Open `http://localhost:3000` in browser to test

### Bare Install

#### Requirements

NodeJS: ^18.12

Yarn: ^1.22

OS: macOS, Linux

#### Steps

1. Open terminal and go to project's folder
2. Run `yarn install` to load all deps
3. Set custom configs in `./configs/*.local.json` files
4. Run `yarn start` to run dev server
5. Open `http://localhost:3000` in browser to test

## Configs

### config.json

App's internal configs

`APP_LOCALE` - default using locale

`APP_TZ` - default using timezone

## Scripts

### yarn build

Builds static files (html, js bundles, etc.) in `./dist` folder from sources

#### ENV Variables

1. DEV_MODE - environment. Can be `development` and `production`. By default - `development`

### yarn clean

Removes all generated files (build, reports, etc.) from project's folder

### yarn clean:build

Removes generated static files from project's folder

### yarn clean:report

Removes generated report files from project's folder

### yarn lint

Checks all source files according to eslint configs

### yarn lint:format

Formats all source files according to eslint configs

### yarn lint:staged

Checks staged source files according to eslint configs

### yarn start

Runs dev server on given port with given host name. Should be used during development to debug application. Supports Hot Module Replacement

#### ENV Variables

1. DEV_MODE - environment. Can be `development` and `production`. By default - `development`
2. DEV_HOST - dev server's host name. By default - `localhost`
3. DEV_PORT - dev server's port. By default - `3000`
4. DEV_MOCK_API - use mocked data instead any API calls

### yarn test

Runs all unit tests. App will use `development` DEV_MODE during tests

### yarn test:coverage

Runs all unit tests and generates tests coverage report in `./report/coverage` folder. Command will use the same environment vars as `yarn test` command

### yarn typecheck

Validates TS types in all source files

### ./scripts/docker-build.sh

Creates application's docker images with given tags. Will replace images with the same names

#### ENV Variables

1. TAGS - docker image tags. Can be array of strings separated by comma. By default - `${name}:latest,${name}:${version}`, where `${version}` is getting from package.json

#### Examples

1. `./scripts/docker-build.sh` - creates image with default tags
2. `TAGS=0.0.1-stage,0.0.1-test ./scripts/docker-build.sh` - creates image with `0.0.1-stage`, `0.0.1-test` tags

### ./scripts/docker-clean.sh

Removes all docker resources related to the app

#### ENV Variables

1. SEARCH_KEY - key using to find all docker resources. Can be any string. By default - `${name}`

#### Examples

1. `./scripts/docker-clean.sh` - removes all docker resources related to the app
2. `SEARCH_KEY=app-custom` - removes all docker resources related to the app using custom `SEARCH_KEY`. Can be useful in case when custom tags names were used to create images and containers

### ./scripts/docker-run.sh

Runs docker container with given tag and env on given port. Will remove currently running container with the same name

#### ENV Variables

1. APP_PORT - local port, on which container will run. By default - `3000`
2. CONFIGS_PATH - directory with custom configs. If provided, will be created temp anonymous volume with specified local dir. By default - ``
3. ENV - using environment. Can be `stage`, `production` and `development`. By default - `stage`
4. TAG - image tag name of the app. By default - `${name}:latest`

#### Examples

1. `./scripts/docker-run.sh` - runs docker container with latest stage version on `3000` port with stage configs
2. `CONFIGS_PATH=~/Documents/app/config ENV=production TAG=app:1.0.4 APP_PORT=8080 ./scripts/docker-run.sh` - runs docker container with specific `app:1.0.4` tag, `production` env, configs from specified dir on `8080` port

### ./scripts/docker-stop.sh

Removes docker container with given name

#### ENV Variables

1. CONTAINER - container name of the app. By default - `${name}_latest`

#### Examples

1. `./scripts/docker-stop.sh` - removes docker container with latest verstion
2. `CONTAINER=app_1.0.4 ./scripts/docker-run.sh` - removes docker container with specific `${name}_1.0.4` name
