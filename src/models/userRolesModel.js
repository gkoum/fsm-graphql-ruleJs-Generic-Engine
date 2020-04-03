/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('userRoles', {
		userId: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'users',
				key: 'id'
			},
			field: 'user_id'
		},
		roleId: {
			type: DataTypes.INTEGER(6),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'roles',
				key: 'id'
			},
			field: 'role_id'
		},
		creationUserId: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: 'users',
				key: 'id'
			},
			field: 'creation_user_id'
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
		tableName: 'user_roles'
	});
};
