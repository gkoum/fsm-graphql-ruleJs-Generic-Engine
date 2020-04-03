/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('oauthClients', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		userId: {
			type: DataTypes.CHAR(36),
			allowNull: true,
			field: 'user_id'
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'name'
		},
		secret: {
			type: DataTypes.STRING(100),
			allowNull: false,
			field: 'secret'
		},
		redirect: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'redirect'
		},
		personalAccessClient: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			field: 'personal_access_client'
		},
		passwordClient: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			field: 'password_client'
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
		}
	}, {
		tableName: 'oauth_clients'
	});
};
