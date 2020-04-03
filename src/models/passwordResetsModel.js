/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('passwordResets', {
		email: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'email'
		},
		token: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'token'
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'created_at'
		}
	}, {
		tableName: 'password_resets'
	});
};
