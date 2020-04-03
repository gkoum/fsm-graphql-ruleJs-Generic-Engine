/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('applicationAttachedDocs', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    applicationId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      references: {
        model: 'applications',
        key: 'id'
      },
      field: 'application_id'
    },
    supportingDocJson: {
      type: DataTypes.JSON,
      allowNull: false,
      field: 'supporting_doc_json'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'updated_at'
    },
    uploadedBy: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      },
      field: 'uploaded_by'
    }
  }, {
      tableName: 'application_attached_docs'
    });
};
