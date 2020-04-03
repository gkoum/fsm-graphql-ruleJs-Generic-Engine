/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('cities', {
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
		countriesId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			references: {
				model: 'countries',
				key: 'id'
			},
			field: 'countries_id'
		},
		statesId: {
			type: DataTypes.INTEGER(6),
			allowNull: true,
			references: {
				model: 'states',
				key: 'id'
			},
			field: 'states_id'
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
		tableName: 'cities'
	});
};
