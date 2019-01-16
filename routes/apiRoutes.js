var db = require("../models");

module.exports = function(hiker) {
  // Get logged in hiker
  hiker.get("/api/hiker/:id", function(req, res) {
    db.hiker.findOne({
      where: {
        user: req.body.user,
        password: req.body.password
      },
    }).then(function(dbHiker) {
      res.json(dbHiker);
    });
  });

  // Create a new hiker
  hiker.post("/api/hiker", function(req, res) {
    db.hiker.create(req.body).then(function(dbHiker) {
      console.log(req.body);
      res.json(dbHiker);
    });
  });

  // Delete a hiker by id
  hiker.delete("/api/hiker/:id", function(req, res) {
    db.hiker.destroy({ where: { id: req.params.id } }).then(function(dbHiker) {
      res.json(dbHiker);
    });
  });
  // connect hikers to mountain
  // hiker.associate = function(models) {
  //   hiker.belongsTo(models.hike, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  //};
};
