/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('boards', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		name: {
			type: DataTypes.STRING(200),
			allowNull: false,
			field: 'name'
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
		createdAt: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'created_at'
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'updated_at'
		}
  }, 
  {
      tableName: 'boards',
      timestamps: false
	});
};
