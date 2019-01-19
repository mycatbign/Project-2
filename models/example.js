module.exports = function(sequelize, DataTypes) {
  var example = sequelize.define("example", {
    Name: DataTypes.STRING,
    Elevation: DataTypes.TEXT,
    Prominence: DataTypes.TEXT,
    State: DataTypes.TEXT,
    LatLong: DataTypes.TEXT,
    Longitude: DataTypes.TEXT
  });
  return example;
};
