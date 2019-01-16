//var Sequelize = require("sequelize");
// require("sequelize-isunique-validator")(Sequelize);
module.exports = function(sequelize, DataTypes) {
  var hiker = sequelize.define("hiker", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 16]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [7, 15]
      }
    }

    // info: {
    //   type: DataTypes.TEXT,
    //   validate: {
    //     len: [1, 200]
    //   }
    // }
  });
  return hiker;
};
