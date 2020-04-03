/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('migrations', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		migration: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'migration'
		},
		batch: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'batch'
		}
	}, {
		tableName: 'migrations'
	});
};
