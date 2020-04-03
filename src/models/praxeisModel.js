/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('praxeis', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		praxeisNo: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'praxeis_no'
		},
		applicationsId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			references: {
				model: 'applications',
				key: 'id'
			},
			field: 'applications_id'
		},
		externalUsersId: {
      type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: 'external_users',
				key: 'id'
			},
			field: 'external_users_id'
		},
		foreignDepartmentsId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			references: {
				model: 'university_depts',
				key: 'id'
			},
			field: 'foreign_departments_id'
		},
		linkToPdf: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'link_to_pdf'
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
		decisionId: {
			type: DataTypes.INTEGER(6),
			allowNull: false,
			references: {
				model: 'final_decisions',
				key: 'id'
			},
			field: 'decision_id'
		},
		applicationTypesId: {
			type: DataTypes.INTEGER(6),
			allowNull: false,
			references: {
				model: 'application_types',
				key: 'id'
			},
			field: 'application_types_id'
		},
		academicAreasId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			references: {
				model: 'academic_areas',
				key: 'id'
			},
			field: 'academic_areas_id'
		},
		praxeisYear: {
			type: DataTypes.STRING(4),
			allowNull: false,
			field: 'praxeis_year'
		},
		greekDepartmentName: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'greek_department_name'
		}
	}, {
		tableName: 'praxeis'
	});
};
