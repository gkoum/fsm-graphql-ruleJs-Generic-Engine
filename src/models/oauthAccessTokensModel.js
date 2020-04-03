/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('oauthAccessTokens', {
		id: {
			type: DataTypes.STRING(100),
			allowNull: false,
			primaryKey: true,
			field: 'id'
		},
		userId: {
			type: DataTypes.CHAR(36),
			allowNull: true,
			field: 'user_id'
		},
		clientId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'client_id'
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'name'
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
		expiresAt: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'expires_at'
		}
	}, {
		tableName: 'oauth_access_tokens'
	});
};
