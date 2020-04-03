/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('universityDepts', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			field: 'id'
		},
		academicAreasId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			references: {
				model: 'academic_areas',
				key: 'id'
			},
			field: 'academic_areas_id'
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
		universityFacultiesId: {
			type: DataTypes.INTEGER(6),
			allowNull: false,
			references: {
				model: 'university_faculties',
				key: 'id'
			},
			field: 'university_faculties_id'
		},
		usersId: {
			type: DataTypes.CHAR(36),
			allowNull: true,
			field: 'users_id'
		},
		programme: {
			type: DataTypes.CHAR(1),
			allowNull: true,
			defaultValue: 'D',
			field: 'programme'
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
		},
		collegesId: {
			type: DataTypes.INTEGER(6),
			allowNull: false,
			references: {
				model: 'colleges',
				key: 'id'
			},
			field: 'colleges_id'
		},
		accredited: {
			type: DataTypes.CHAR(1),
			allowNull: false,
			defaultValue: 'U',
			field: 'accredited'
		}
	}, {
		tableName: 'university_depts'
	});
};
