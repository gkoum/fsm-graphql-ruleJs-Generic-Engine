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

  Application.associate = models => {
    Application.belongsTo(models.User)
  }

  Application.validateEventForSubject = ({ application: application, values: values } = {}) => {
    console.log('validateEventForSubject') // , application, values)
    return true
  }

  Application.validateStructure = ({ application: application, values: values } = {}) => {
    console.log('validateStructure') // , application, values)
    return true
  }

  return Application
}

export default application
