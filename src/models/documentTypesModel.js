const documentTypes = (sequelize, DataTypes) => {
  const Document_types = sequelize.define('document_types', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    short_name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true
    },
    // possible values of doct_use 
    //     0: personal_data, 1: consent form, 2:paravolo, 3:title, 4:dilosi 5:transcription
    document_type_use: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true
    },
  })

  return Document_types
}

export default documentTypes
