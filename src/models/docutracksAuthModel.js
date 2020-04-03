/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('docutracksAuth', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'name'
		},
		value: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'value'
		},
		domain: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'domain'
		},
		path: {
			type: DataTypes.STRING(255),
			allowNull: false,
			defaultValue: '/',
			field: 'path'
		},
		secure: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '0',
			field: 'secure'
		},
		httponly: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '0',
			field: 'httponly'
		},
		expires: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'expires'
		},
		maxage: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'maxage'
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
		tableName: 'docutracks_auth'
	});
};
