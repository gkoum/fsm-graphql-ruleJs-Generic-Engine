/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('oauthAccessTokenProviders', {
		oauthAccessTokenId: {
			type: DataTypes.STRING(100),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'oauth_access_tokens',
				key: 'id'
			},
			field: 'oauth_access_token_id'
		},
		provider: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'provider'
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
		tableName: 'oauth_access_token_providers'
	});
};
