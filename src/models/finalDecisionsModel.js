/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('finalDecisions', {
		id: {
			type: DataTypes.INTEGER(6),
			allowNull: false,
			primaryKey: true,
			field: 'id'
		},
		decisionText: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'decision_text'
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
		tableName: 'final_decisions'
	});
};
