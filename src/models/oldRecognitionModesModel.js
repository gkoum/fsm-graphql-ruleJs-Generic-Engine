/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('oldRecognitionModes', {
		id: {
			type: DataTypes.INTEGER(6),
			allowNull: false,
			primaryKey: true,
			field: 'id'
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'description'
		}
	}, {
		tableName: 'old_recognition_modes'
	});
};
