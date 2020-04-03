/* jshint indent: 1 */

const users = (sequelize, DataTypes) => {
	const Users = sequelize.define('users', {
		id: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
			field: 'id'
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: false,
			unique: true,
			field: 'name'
		},
		firstname: {
			type: DataTypes.STRING(510),
			allowNull: true,
			field: 'firstname'
		},
		surname: {
			type: DataTypes.STRING(510),
			allowNull: true,
			field: 'surname'
		},
		fathersName: {
			type: DataTypes.STRING(40),
			allowNull: true,
			field: 'fathers_name'
		},
		mothersName: {
			type: DataTypes.STRING(40),
			allowNull: true,
			field: 'mothers_name'
		},
		birthdate: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'birthdate'
		},
		addressCountry: {
			type: DataTypes.STRING(40),
			allowNull: true,
			field: 'address_country'
		},
		addressArea: {
			type: DataTypes.STRING(40),
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
		landline: {
			type: DataTypes.STRING(510),
			allowNull: true,
			field: 'landline'
		},
		mobilePhone: {
			type: DataTypes.STRING(510),
			allowNull: true,
			field: 'mobile_phone'
		},
		email: {
			type: DataTypes.STRING(510),
			allowNull: false,
			unique: true,
			field: 'email'
		},
		adtNo: {
			type: DataTypes.STRING(510),
			allowNull: true,
			field: 'adt_no'
		},
		afm: {
			type: DataTypes.STRING(255),
			allowNull: false,
			unique: true,
			field: 'afm'
		},
		doy: {
			type: DataTypes.STRING(40),
			allowNull: true,
			field: 'doy'
		},
		iban: {
			type: DataTypes.STRING(510),
			allowNull: true,
			field: 'iban'
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
		deletedAt: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'deleted_at'
		},
		activated: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '0',
			field: 'activated'
		}
	}, {
		tableName: 'users'
  })
  
  Users.findByLogin = async login => {
    let user = await User.findOne({
      where: { username: login },
    })

    if (!user) {
      user = await User.findOne({
        where: { email: login },
      })
    }

    return user
  }

  Users.validateUser = async (user, subject) => {
    // check Authorizaton (roles, priviliges) and return it
    return {
      user: user,
      roles: ['prechecker', 'proponent'],
      canIssueEvent: true,
      subjectBelongsToUser: true
    }
  }

  Users.beforeCreate(async user => {
    user.password = await user.generatePasswordHash();
  })

  Users.prototype.generatePasswordHash = async function () {
    const saltRounds = 10;
    return await bcrypt.hash(this.password, saltRounds);
  }

  Users.prototype.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  return Users;
}

export default users;