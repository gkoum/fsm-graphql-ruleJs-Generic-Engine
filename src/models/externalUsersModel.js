/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('externalUsers', {
		id: {
			type: DataTypes.CHAR(36),
			allowNull: false,
			primaryKey: true,
			field: 'id'
		},
		oldId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			unique: true,
			field: 'old_id'
		},
		createStatus: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			defaultValue: '0',
			field: 'create_status'
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: false,
			unique: true,
			field: 'name'
		},
		firstname: {
			type: DataTypes.STRING(510),
			allowNull: false,
			field: 'firstname'
		},
		surname: {
			type: DataTypes.STRING(510),
			allowNull: false,
			field: 'surname'
		},
		gender: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'gender'
		},
		fathersName: {
			type: DataTypes.STRING(100),
			allowNull: false,
			field: 'fathers_name'
		},
		mothersName: {
			type: DataTypes.STRING(100),
			allowNull: false,
			field: 'mothers_name'
		},
		birthdate: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'birthdate'
		},
		countryId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			references: {
				model: 'countries',
				key: 'id'
			},
			field: 'country_id'
		},
		addressArea: {
			type: DataTypes.STRING(200),
			allowNull: true,
			field: 'address_area'
		},
		addressCity: {
			type: DataTypes.STRING(510),
			allowNull: true,
			field: 'address_city'
		},
		addressStreet: {
			type: DataTypes.STRING(510),
			allowNull: true,
			field: 'address_street'
		},
		addressZipcode: {
			type: DataTypes.STRING(16),
			allowNull: true,
			field: 'address_zipcode'
		},
		mobilePhone: {
			type: DataTypes.STRING(510),
			allowNull: true,
			field: 'mobile_phone'
		},
		email: {
			type: DataTypes.STRING(510),
			allowNull: true,
			field: 'email'
		},
		adtNo: {
			type: DataTypes.STRING(510),
			allowNull: true,
			field: 'adt_no'
		},
		afm: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'afm'
		},
		password: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'password'
		},
		rememberToken: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'remember_token'
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
		visa: {
			type: DataTypes.STRING(510),
			allowNull: true,
			field: 'visa'
		},
		fromVisa: {
			type: DataTypes.DATEONLY,
			allowNull: true,
			field: 'from_visa'
		},
		toVisa: {
			type: DataTypes.DATEONLY,
			allowNull: true,
			field: 'to_visa'
		},
		landline: {
			type: DataTypes.STRING(510),
			allowNull: true,
			field: 'landline'
		},
		countryOfBirthId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			references: {
				model: 'countries',
				key: 'id'
			},
			field: 'country_of_birth_id'
		},
		cityOfBirth: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'city_of_birth'
		},
		bidx: {
			type: DataTypes.STRING(60),
			allowNull: true,
			field: 'bidx'
		},
		foreignerIdNum: {
			type: DataTypes.STRING(510),
			allowNull: true,
			field: 'foreigner_id_num'
		},
		foreignerIdCountry: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'foreigner_id_country'
		},
		foreignerbidx: {
			type: DataTypes.STRING(60),
			allowNull: true,
			field: 'foreignerbidx'
		},
		bidxBirthdate: {
			type: DataTypes.STRING(60),
			allowNull: true,
			field: 'bidx_birthdate'
		}
	}, {
		tableName: 'external_users'
	});
};
