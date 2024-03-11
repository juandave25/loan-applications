## Description

Microservice that manages loan applications, including submission, status checks, and admin management.

## Installation

```bash
$ npm install
```

## Running the app
You need to follow the execution order for first and second commands then you can choose what command to execute:
```bash
# Create database in postgresql
$ npm run create-db

# Run migrations and database seeding
$ npm run migration:run

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

```
## open your browser 
http://localhost:3000/

## Swagger Documentation
To explore API documentation using swagger:

http://localhost:3000/api/swagger


## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Containerization
```bash
# If you wanna use docker you can execute the docker-compose.yml file
$ docker compose up
# After you have build the image you can create your container based on this image
$ docker run --name <<container name>> <<image name>>
```

## Stay in touch

- Author - Juan Vélez

## License

Nest is [MIT licensed](LICENSE).
