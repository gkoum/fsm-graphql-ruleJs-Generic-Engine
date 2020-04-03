/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('oauthRefreshTokens', {
		id: {
			type: DataTypes.STRING(100),
			allowNull: false,
			primaryKey: true,
			field: 'id'
		},
		accessTokenId: {
			type: DataTypes.STRING(100),
			allowNull: false,
			field: 'access_token_id'
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
		tableName: 'oauth_refresh_tokens'
	});
};
