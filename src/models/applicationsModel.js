/* jshint indent: 1 */
const { structures } = require('../structures/structures')

module.exports = function(sequelize, DataTypes) {
  const Applications = sequelize.define('applications', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		externalUsersId: {
			type: DataTypes.CHAR(36),
			allowNull: false,
			references: {
				model: 'external_users',
				key: 'id'
			},
			field: 'external_users_id'
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
		protocolNo: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			field: 'protocol_no'
		},
		digitalSignedDate: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'digital_signed_date'
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
		specialFields: {
			type: DataTypes.JSON,
			allowNull: true,
			field: 'special_fields'
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
		protocol: {
			type: DataTypes.STRING(15),
			allowNull: true,
			unique: true,
			field: 'protocol'
		},
		protocolDate: {
			type: DataTypes.DATE,
			allowNull: true,
			unique: true,
			field: 'protocol_date'
		},
		doatapProt: {
			type: DataTypes.JSON,
			allowNull: true,
			field: 'doatap_prot'
		}
	}, {
		tableName: 'applications'
  });
  // Applications.validateEventForSubject = ({ application: application, event: event } = {}) => {
  //   // if application.state can accept the incoming event... same as validateTransitionRequest?
  //   console.log('---validateEventForSubject') // , application, values)
  //   return true
  // }
  Applications.validateStructure = ({ application: application, structure: structure } = {}) => {
    console.log('---validateStructure', application, structure)
    if (structures[structure] instanceof Function) {
      structures[structure](application)
    }
    return true
  }
  return Applications
};
