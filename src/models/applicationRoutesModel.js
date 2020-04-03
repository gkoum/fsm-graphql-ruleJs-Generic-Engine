/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('applicationRoutes', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		applicationId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			references: {
				model: 'applications',
				key: 'id'
			},
			field: 'application_id'
		},
		applicationStatus: {
			type: DataTypes.STRING(40),
			allowNull: false,
			field: 'application_status'
		},
		userToId: {
			type: DataTypes.UUID,
			allowNull: true,
			references: {
				model: 'users',
				key: 'id'
			},
			field: 'user_to_id'
		},
		roleFromId: {
			type: DataTypes.INTEGER(6),
			allowNull: true,
			references: {
				model: 'roles',
				key: 'id'
			},
			field: 'role_from_id'
		},
		roleToId: {
			type: DataTypes.INTEGER(6),
			allowNull: true,
			references: {
				model: 'roles',
				key: 'id'
			},
			field: 'role_to_id'
		},
		dateCreated: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'date_created'
		},
		dateCompleted: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'date_completed'
		},
		comments: {
			type: DataTypes.JSON,
			allowNull: true,
			field: 'comments'
		},
		userFromId: {
			type: DataTypes.UUID,
			allowNull: true,
			references: {
				model: 'users',
				key: 'id'
			},
			field: 'user_from_id'
		},
		previousStep: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			references: {
				model: 'application_routes',
				key: 'id'
			},
			field: 'previous_step'
		},
		historyStepJson: {
			type: DataTypes.JSON,
			allowNull: true,
			field: 'history_step_json'
		}
  },
  {
    tableName: 'application_routes',
    timestamps: false
  });
};
