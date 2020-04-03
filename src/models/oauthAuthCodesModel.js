/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('oauthAuthCodes', {
		id: {
			type: DataTypes.STRING(100),
			allowNull: false,
			primaryKey: true,
			field: 'id'
		},
		userId: {
			type: DataTypes.CHAR(36),
			allowNull: false,
			field: 'user_id'
		},
		clientId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'client_id'
		},
		scopes: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'scopes'
		},
		revoked: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			field: 'revoked'
		},
		expiresAt: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'expires_at'
		}
	}, {
		tableName: 'oauth_auth_codes'
	});
};
