# Billy Coding Exercise

this project consists of a small api that returns events and related smart contracts information

## Getting started

Prerequisites:

- Node v18
- Docker

install all the project depedencies with:

```shell
npm install
```

setup and boostrap the db with the following commands:

```shell
npm run db:install
```

launch the container hosting the DB with:

```shell
npm run db:start
```

and finally build the project with:

```shell
npm run build
```

### OPTIONAL

if something goes wrong, you can destroy the container with:

```shell
npm run db:destroy
```

You can do both destroy and start the container with:

```shell
npm run db:restart
```

in case you need to destroy the container, remove and rebuild the associated image:

```shell
npm run db:reinstall
```

## Testing the api

Once everything is set up, launch the api server with:

- dev mode

```shell
npm run dev
```

- prod mode (serving directly from the build folder)

```shell
npm start
```

to generate the swagger.json file:

```shell
npm run swagger
```

Once those steps are completed and the server is up and running, the swagger will be available at:

- [http://localhost:8000/docs/](#http://localhost:8000/docs/)

## API specs

- GET /events?start={unix timestamp}

  Returns a list of all the events in the database with their associated tickets. The list can be filtered with a parameter "start" corresponding to the event sale start time in its tickets (in a unix timestamp format)

- GET /event/{id}

  Returns the event corresponding to the Id provided in the url

- POST /event/{id}

  Updates an event and its tickets
