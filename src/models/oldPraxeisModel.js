/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('oldPraxeis', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		praxeisNo: {
			type: DataTypes.STRING(20),
			allowNull: false,
			field: 'praxeis_no'
		},
		externalUsersId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'external_users_id'
		},
		departmentId: {
			type: DataTypes.INTEGER(6),
			allowNull: false,
			field: 'department_id'
		},
		decisionId: {
			type: DataTypes.INTEGER(6),
			allowNull: true,
			references: {
				model: 'old_recognition_modes',
				key: 'id'
			},
			field: 'decision_id'
		},
		applicationTypesId: {
			type: DataTypes.CHAR(1),
			allowNull: false,
			field: 'application_types_id'
		},
		academicAreasId: {
			type: DataTypes.INTEGER(6),
			allowNull: true,
			field: 'academic_areas_id'
		},
		praxeisYear: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'praxeis_year'
		},
		greekDepartmentId: {
			type: DataTypes.INTEGER(6),
			allowNull: true,
			field: 'greek_department_id'
		},
		title: {
			type: DataTypes.STRING(80),
			allowNull: false,
			field: 'title'
		},
		praxeisId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'praxeis_id'
		}
	}, {
		tableName: 'old_praxeis'
	});
};
