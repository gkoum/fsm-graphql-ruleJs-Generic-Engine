/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('universities', {
		id: {
			type: DataTypes.INTEGER(6),
			allowNull: false,
			primaryKey: true,
			field: 'id'
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'name'
		},
		exName: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'ex_name'
		},
		comments: {
			type: DataTypes.STRING(200),
			allowNull: true,
			field: 'comments'
		},
		citiesId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			references: {
				model: 'cities',
				key: 'id'
			},
			field: 'cities_id'
		},
		faxNo: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'fax_no'
		},
		otherPhone: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'other_phone'
		},
		email: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'email'
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
			type: DataTypes.CHAR(36),
			allowNull: true,
			field: 'users_id'
		},
		active: {
			type: DataTypes.CHAR(1),
			allowNull: false,
			field: 'active'
		},
		universityTypeStatus: {
			type: DataTypes.CHAR(1),
			allowNull: true,
			field: 'university_type_status'
		},
		countriesId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			references: {
				model: 'countries',
				key: 'id'
			},
			field: 'countries_id'
		},
		greekCountiesId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			field: 'greek_counties_id'
		},
		statesId: {
			type: DataTypes.INTEGER(6),
			allowNull: true,
			references: {
				model: 'states',
				key: 'id'
			},
			field: 'states_id'
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
		},
		address: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'address'
		},
		phone: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'phone'
		},
		studyYears: {
			type: DataTypes.INTEGER(4),
			allowNull: true,
			defaultValue: '4',
			field: 'study_years'
		},
		accredited: {
			type: DataTypes.CHAR(1),
			allowNull: false,
			defaultValue: 'U',
			field: 'accredited'
		},
		nonUniversitiesTypeId: {
			type: DataTypes.INTEGER(6),
			allowNull: true,
			field: 'non_universities_type_id'
		},
		hInternet: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'h_internet'
		},
		type: {
			type: DataTypes.CHAR(1),
			allowNull: true,
			field: 'type'
		},
		exName1: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'ex_name1'
		}
	}, {
		tableName: 'universities'
	});
};
