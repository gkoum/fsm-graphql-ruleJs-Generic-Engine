/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('meetings', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			field: 'id'
		},
		meetingNo: {
			type: DataTypes.STRING(25),
			allowNull: false,
			field: 'meeting_no'
		},
		meetingDate: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'meeting_date'
		},
		dsEpitropi: {
			type: DataTypes.CHAR(1),
			allowNull: false,
			defaultValue: 'D',
			field: 'ds_epitropi'
		},
		respId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			field: 'resp_id'
		},
		oldUserCreate: {
			type: DataTypes.STRING(36),
			allowNull: true,
			field: 'old_user_create'
		},
		oldUserUpdate: {
			type: DataTypes.STRING(36),
			allowNull: true,
			field: 'old_user_update'
		},
		userCreate: {
			type: DataTypes.UUID,
			allowNull: true,
			references: {
				model: 'users',
				key: 'id'
			},
			field: 'user_create'
		},
		userUpdate: {
			type: DataTypes.UUID,
			allowNull: true,
			references: {
				model: 'users',
				key: 'id'
			},
			field: 'user_update'
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
		tableName: 'meetings'
	});
};
