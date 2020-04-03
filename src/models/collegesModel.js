/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('colleges', {
		id: {
			type: DataTypes.INTEGER(6),
			allowNull: false,
			primaryKey: true,
			field: 'id'
		},
		universitiesId: {
			type: DataTypes.INTEGER(6),
			allowNull: false,
			references: {
				model: 'universities',
				key: 'id'
			},
			field: 'universities_id'
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'name'
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
		usersId: {
			type: DataTypes.UUID,
			allowNull: true,
			references: {
				model: 'users',
				key: 'id'
			},
			field: 'users_id'
		},
		accredited: {
			type: DataTypes.CHAR(1),
			allowNull: false,
			defaultValue: 'U',
			field: 'accredited'
		},
		active: {
			type: DataTypes.CHAR(1),
			allowNull: true,
			field: 'active'
		},
		comments: {
			type: DataTypes.STRING(200),
			allowNull: true,
			field: 'comments'
		},
		meetingsId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			defaultValue: '0',
			references: {
				model: 'meetings',
				key: 'id'
			},
			field: 'meetings_id'
		},
		epitropiId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			field: 'epitropi_id'
		}
	}, {
		tableName: 'colleges'
	});
};
