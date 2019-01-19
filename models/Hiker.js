//var Sequelize = require("sequelize");
// require("sequelize-isunique-validator")(Sequelize);
module.exports = function(sequelize, DataTypes) {
  var hiker = sequelize.define("hiker", {
    // id: {
    //   autoIncrement: true,
    //   primaryKey: true,
    //   type: DataTypes.INTEGER
    // },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      validate: {
        len: [1, 16]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 15]
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 15]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 15]
      }
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 15]
      }
    },

    information: {
      type: DataTypes.TEXT,
      validate: {
        len: [1, 200]
      }
    },
    image: {
      type: DataTypes.BLOB,
      allowNull: false
    }
  });
  return hiker;
};
