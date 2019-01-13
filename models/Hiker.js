module.exports = function(sequelize, DataTypes) {
  var Hiker = sequelize.define("Hiker", {
    User: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 15],
        unique: true
      }
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 15],
        unique: true
      }
    },

    description: {
      allowNull: true,
      type: DataTypes.TEXT,
      validate: {
        len: [1, 200]
      }
    }
  });
  return Hiker;
};
