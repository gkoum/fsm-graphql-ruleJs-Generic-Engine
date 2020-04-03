/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('notifications', {
		id: {
			type: DataTypes.CHAR(36),
			allowNull: false,
			primaryKey: true,
			field: 'id'
		},
		type: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'type'
		},
		notifiableType: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'notifiable_type'
		},
		notifiableId: {
			type: DataTypes.BIGINT,
			allowNull: false,
			field: 'notifiable_id'
		},
		data: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'data'
		},
		readAt: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'read_at'
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
		tableName: 'notifications'
	});
};
