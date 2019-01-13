var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/hiker/:id", function(req, res) {
    db.Hiker.findOne({
      where: {
        user: req.params.user,
        pasword: req.params.password
      },
      include: [db.User, db.Info]
    }).then(function(dbHiker) {
      res.json(dbHiker);
    });
  });

  // Create a new example
  app.post("/api/hiker", function(req, res) {
    db.Hiker.create(req.body).then(function(dbHiker) {
      res.json(dbHiker);
    });
  });

  // Delete an example by id
  app.delete("/api/hiker/:id", function(req, res) {
    db.Hiker.destroy({ where: { id: req.params.id } }).then(function(dbHiker) {
      res.json(dbHiker);
    });
  });
  Hiker.associate = function(models) {
    Hiker.belongsTo(models.Hike, {
      foreignKey: {
        allowNull: false
      }
    });
  };
};
