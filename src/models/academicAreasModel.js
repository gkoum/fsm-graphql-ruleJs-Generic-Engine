module.exports = function (sequelize, DataTypes) {
  return sequelize.define('academicAreas', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    name: {
      type: DataTypes.STRING(80),
      allowNull: false,
      field: 'name'
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
    status: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      field: 'status'
    },
    sectionsId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      references: {
        model: 'sections',
        key: 'id'
      },
      field: 'sections_id'
    },
    codePraxeis: {
      type: DataTypes.STRING(15),
      allowNull: false,
      field: 'code_praxeis'
    },
    oldAcademicAreasId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'old_academic_areas_id'
    }
  }, {
      tableName: 'academic_areas'
    });
};
