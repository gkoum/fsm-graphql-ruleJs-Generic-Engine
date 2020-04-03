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
  Users: sequelize.import('./usersModel'),
  Roles: sequelize.import('./rolesModel'),
  UserRoles: sequelize.import('./userRolesModel'),
  // User: sequelize.import('./userModel'),
  // Message: sequelize.import('./messageModel'),
  Applications: sequelize.import('./applicationsModel'),
  Fsm: sequelize.import('./fsmModel'),
  DocumentTypes: sequelize.import('./documentTypesModel'),
  AcademicAreas: sequelize.import('./academicAreasModel'),
  ApplicationAttachedDocs: sequelize.import('./applicationAttachedDocsModel'),
  ApplicationDocTypes: sequelize.import('./applicationDocTypesModel'),
  ApplicationRoutes: sequelize.import('./applicationRoutesModel'),
  ApplicationTypes: sequelize.import('./applicationTypesModel'),
  BoardMembers: sequelize.import('./boardMembersModel'),
  Boards: sequelize.import('./boardsModel'),
  Cities: sequelize.import('./citiesModel'),
  Colleges: sequelize.import('./collegesModel'),
  Countries: sequelize.import('./countriesModel'),
  DocumentTypes: sequelize.import('./documentTypesModel'),
  DocutracksAuth: sequelize.import('./docutracksAuthModel'),
  ExternalUsers: sequelize.import('./externalUsersModel'),
  FinalDecisions: sequelize.import('./finalDecisionsModel'),
  GreekCounties: sequelize.import('./greekCountiesModel'),
  Meetings: sequelize.import('./meetingsModel'),
  NonUniversityTypes: sequelize.import('./nonUniversityTypesModel'),
  Notifications: sequelize.import('./notificationsModel'),
  OauthAccessTokenProviders: sequelize.import('./oauthAccessTokenProvidersModel'),
  OauthAccessTokens: sequelize.import('./oauthAccessTokensModel'),
  OauthAuthCodes: sequelize.import('./oauthAuthCodesModel'),
  OauthClients: sequelize.import('./oauthClientsModel'),
  OauthPersonalAccessClients: sequelize.import('./oauthPersonalAccessClientsModel'),
  OauthRefreshTokens: sequelize.import('./oauthRefreshTokensModel'),
  OldPraxeis: sequelize.import('./oldPraxeisModel'),
  OldRecognitionModes: sequelize.import('./oldRecognitionModesModel'),
  PasswordResets: sequelize.import('./passwordResetsModel'),
  Praxeis: sequelize.import('./praxeisModel'),
  Recommendations: sequelize.import('./recommendationsModel'),
  Sections: sequelize.import('./sectionsModel'),
  States: sequelize.import('./statesModel'),
  Universities: sequelize.import('./universitiesModel'),
  UniversityDepts: sequelize.import('./universityDeptsModel'),
  UniversityFaculties: sequelize.import('./universityFacultiesModel'),
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
