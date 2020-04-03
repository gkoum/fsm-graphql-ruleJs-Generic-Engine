/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('roles', {
		id: {
			type: DataTypes.INTEGER(6),
			allowNull: false,
			primaryKey: true,
			field: 'id'
		},
		name: {
			type: DataTypes.STRING(40),
			allowNull: false,
			unique: true,
			field: 'name'
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'description'
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
		grName: {
			type: DataTypes.STRING(40),
			allowNull: true,
			unique: true,
			field: 'gr_name'
		}
	}, {
		tableName: 'roles'
	});
};
