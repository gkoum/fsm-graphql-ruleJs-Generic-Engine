const state = (sequelize, DataTypes) => {
  const State = sequelize.define('state', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    }
  });

  Message.associate = models => {
    Message.belongsTo(models.User);
  };

  return State;
};

export default state;