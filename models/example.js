module.exports = function(sequelize, DataTypes) {
  var Example = sequelize.define("Example", {
    Name: DataTypes.STRING,
    Elevation: DataTypes.TEXT,
    Prominence: DataTypes.TEXT,
    State: DataTypes.TEXT
  });
  return Example;
};
