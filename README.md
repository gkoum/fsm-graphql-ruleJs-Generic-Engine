# fsm-graphql-rulesJs-Generic-Engine

## Installation

* `git clone git@github.com:the-road-to-graphql/fullstack-apollo-express-postgresql-boilerplate.git`
* `cd fullstack-apollo-express-postgresql-boilerplate`
* `touch .env`
* `npm install`
* fill out *.env file* (see below)
* start PostgreSQL database
* `npm start`
* visit `http://localhost:8000` for GraphQL playground

#### .env file

Since this boilerplate project is using PostgreSQL, you have to install it for your machine and get a database up and running. You find everything for the set up over here: [Setup PostgreSQL with Sequelize in Express Tutorial](https://www.robinwieruch.de/postgres-express-setup-tutorial). After you have created a database and a database user, you can fill out the environment variables in the *server/.env* file.

```
DATABASE=mydatabase

DATABASE_USER=postgres
DATABASE_PASSWORD=postgres

SECRET=asdlplplfwfwefwekwself.2342.dawasdq
```

The `SECRET` is just a random string for your authentication. Keep all these information secure by adding the *.env* file to your *.gitignore* file. No third-party should have access to this information.

#### Testing

* adjust `test:run-server` npm script with `TEST_DATABASE` environment variable in package.json to match your testing database name
  * to match it from package.json: `createdb mytestdatabase` with psql
* one terminal: npm run test:run-server
* second terminal: npm run test:execute-test
