'use strict';
module.exports = (sequelize, DataTypes) => {
  const document_types = sequelize.define('document_types', {
    name: DataTypes.STRING
  }, {});
  document_types.associate = function(models) {
    // associations can be defined here
  };
  return document_types;
};