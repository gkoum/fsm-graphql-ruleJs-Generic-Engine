/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('applicationTypes', {
		id: {
			type: DataTypes.INTEGER(6),
			allowNull: false,
			primaryKey: true,
			field: 'id'
		},
		name: {
			type: DataTypes.STRING(80),
			allowNull: false,
			field: 'name'
		},
		category: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
			field: 'category'
		},
		cost: {
			type: DataTypes.DECIMAL,
			allowNull: false,
			field: 'cost'
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
		protocolPrefix: {
			type: DataTypes.CHAR(1),
			allowNull: true,
			field: 'protocol_prefix'
		},
		tooltip: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'tooltip'
		},
		praxeisDegreeType: {
			type: DataTypes.STRING(1),
			allowNull: true,
			field: 'praxeis_degree_type'
		}
	}, {
		tableName: 'application_types'
	});
};
