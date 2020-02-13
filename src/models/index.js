import Sequelize from 'sequelize'

let sequelize;
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'mysql',
  });
} else {
  sequelize = new Sequelize(
    process.env.TEST_DATABASE || process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
    },
  );
}

const models = {
  User: sequelize.import('./userModel'),
  Message: sequelize.import('./messageModel'),
  Application: sequelize.import('./applicationModel'),
  Fsm: sequelize.import('./fsmModel')
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models)
  }
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to DB has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

export { sequelize }

export default models
