/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('boardMembers', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		boardId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			references: {
				model: 'boards',
				key: 'id'
			},
			field: 'board_id'
		},
		memberId: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: 'users',
				key: 'id'
			},
			field: 'member_id'
		},
		startDate: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'start_date'
		},
		endDate: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'end_date'
		},
		deletedAt: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'deleted_at'
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
		tableName: 'board_members'
	});
};
