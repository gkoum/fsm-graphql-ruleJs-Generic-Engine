import 'dotenv/config'
import cors from 'cors'
import morgan from 'morgan'
import http from 'http'
import jwt from 'jsonwebtoken'
import DataLoader from 'dataloader'
import express from 'express'
import {
  ApolloServer,
  AuthenticationError,
} from 'apollo-server-express'


import schema from './schema'
import resolvers from './resolvers'
import models, { sequelize } from './models'
import loaders from './loaders'
import { fsmImage } from './models/fsmImage'
import { wizardImage } from './models/wizardImage'
import { wizardDesignProcess } from './models/wizardDesignProcess'

const app = express()

app.locals.activeFsm = fsmImage
app.locals.activeWizard = wizardImage
app.locals.wizardDesignProcess = wizardDesignProcess

app.use(cors())
// app.use(bodyParser.urlencoded());
app.use(morgan('dev'))

const getMe = async req => {
  // app.locals.activeFsm = fsmImage
  // console.dir(app.locals)
  const token = req.headers['x-token']

  if (token) {
    try {
      // console.log(token)
      return await jwt.verify(token, process.env.SECRET)
    } catch (e) {
      throw new AuthenticationError(
        'Your session expired. Sign in again.',
      );
    }
  }
};

const server = new ApolloServer({
  introspection: true,
  playground: true,
  tracing: true,
  typeDefs: schema,
  resolvers,
  formatError: error => {
    // remove the internal sequelize error message
    // leave only the important validation error
    const message = error.message
      .replace('SequelizeValidationError: ', '')
      .replace('Validation error: ', '')

    return {
      ...error,
      message,
    };
  },
  context: async ({ req, connection }) => {
    let activeFsm = await fsmImage// models.Fsm.findByPk(2)
    // console.log(fsmImage)
    if (connection) {
      return {
        models,
        loaders: {
          user: new DataLoader(keys =>
            loaders.user.batchUsers(keys, models),
          ),
        },
      };
    }

    if (req) {
      const me = await getMe(req);
      
      return {
        models,
        me,
        activeFsm: activeFsm,
        wizardDesignProcess: wizardDesignProcess,
        secret: process.env.SECRET,
        loaders: {
          user: new DataLoader(keys =>
            loaders.user.batchUsers(keys, models),
          ),
        },
      };
    }
  },
})

server.applyMiddleware({ app, path: '/graphql' })

const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

const isTest = !!process.env.TEST_DATABASE
const isProduction = !!process.env.DATABASE_URL
const isDevelopment = !!process.env.DATABASE
const port = process.env.PORT || 8000;

httpServer.listen({ port }, () => {
  console.log(`Apollo Server on http://localhost:${port}/graphql`);
});

// sequelize.sync().then(async () => { // { force: isTest || isProduction }
//   if (isTest || isProduction) {
//     createUsersWithMessages(new Date())
//   }

//   httpServer.listen({ port }, () => {
//     console.log(`Apollo Server on http://localhost:${port}/graphql`);
//   });
// });

// const createUsersWithMessages = async date => {
//   await models.User.create(
//     {
//       username: 'rwieruch',
//       email: 'hello@robin.com',
//       password: 'rwieruch',
//       role: 'ADMIN',
//       messages: [
//         {
//           text: 'Published the Road to learn React',
//           createdAt: date.setSeconds(date.getSeconds() + 1),
//         },
//       ],
//     },
//     {
//       include: [models.Message],
//     },
//   );

//   await models.User.create(
//     {
//       username: 'ddavids',
//       email: 'hello@david.com',
//       password: 'ddavids',
//       messages: [
//         {
//           text: 'Happy to release ...',
//           createdAt: date.setSeconds(date.getSeconds() + 1),
//         },
//         {
//           text: 'Published a complete ...',
//           createdAt: date.setSeconds(date.getSeconds() + 1),
//         },
//       ],
//     },
//     {
//       include: [models.Message],
//     },
//   );
// };
