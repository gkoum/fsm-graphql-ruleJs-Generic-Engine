const { structures } = require('../structures/structures')

const application = (sequelize, DataTypes) => {
  const Application = sequelize.define('application', {
    protocol: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true
    },
    protocol_no: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true
    },
    protocol_date: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true
    },
    digital_signed_date: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true
    },
    special_fields: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true
    }
  })

  // Application.associate = models => {
  //   Application.belongsTo(models.User)
  // }

  // Application.validateEventForSubject = ({ fsmSubject, event } = {}) => {
  //   // if application.state can accept the incoming event... same as validateTransitionRequest?
  //   console.log('---validateEventForSubject: ', event) // , application, values)
  //   return true
  // }

  Application.validateStructure = ({ application: application, structure: structure } = {}) => {
    console.log('---validateStructure', application, structure)
    if (structures[structure] instanceof Function) {
      structures[structure](application)
    }
    return true
  }

  return Application
}

export default application
