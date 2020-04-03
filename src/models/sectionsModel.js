/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('sections', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		tmhma: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
			field: 'tmhma'
		},
		name: {
			type: DataTypes.STRING(512),
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
		}
	}, {
		tableName: 'sections'
	});
};
