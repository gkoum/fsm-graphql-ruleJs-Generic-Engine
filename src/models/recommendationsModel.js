/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('recommendations', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'description'
		}
	}, {
		tableName: 'recommendations'
	});
};
