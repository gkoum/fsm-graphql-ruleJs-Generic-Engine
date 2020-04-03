/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('applicationDocTypes', {
		applicationTypesId: {
			type: DataTypes.INTEGER(6),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'application_types',
				key: 'id'
			},
			field: 'application_types_id'
		},
		documentTypesId: {
			type: DataTypes.INTEGER(6),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'document_types',
				key: 'id'
			},
			field: 'document_types_id'
		},
		seq: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
			field: 'seq'
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
		obligatory: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			field: 'obligatory'
		}
	}, {
		tableName: 'application_doc_types'
	});
};
