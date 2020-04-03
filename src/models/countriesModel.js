/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('countries', {
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
		exName: {
			type: DataTypes.STRING(40),
			allowNull: true,
			field: 'ex_name'
		},
		statesExist: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '0',
			field: 'states_exist'
		},
		shortName: {
			type: DataTypes.STRING(4),
			allowNull: false,
			unique: true,
			field: 'short_name'
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
		tableName: 'countries'
	});
};
