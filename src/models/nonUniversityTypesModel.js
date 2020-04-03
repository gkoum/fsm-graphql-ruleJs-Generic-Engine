/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('nonUniversityTypes', {
		id: {
			type: DataTypes.INTEGER(6),
			allowNull: false,
			primaryKey: true,
			field: 'id'
		},
		description: {
			type: DataTypes.STRING(512),
			allowNull: false,
			field: 'description'
		},
		usersId: {
      type: DataTypes.UUID,
			allowNull: true,
			references: {
				model: 'users',
				key: 'id'
			},
			field: 'users_id'
		}
	}, {
		tableName: 'non_university_types'
	});
};
