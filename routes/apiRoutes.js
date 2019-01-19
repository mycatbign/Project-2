var db = require("../models");

module.exports = function(app) {
  // Get logged in hiker
  app.get("/api/hiker/:user", function(req, res) {
    db.hiker
      .findOne({
        where: {
          user: req.params.user
        }
      })
      .then(function(dbHiker) {
        res.json(dbHiker);
      });
  });
  app.get("/api/hiker", function(req, res) {
    db.hiker.findAll({}).then(function(dbHiker) {
      res.json(dbHiker);
    });
  });

  // Create a new hiker
  app.post("/api/hiker", function(req, res) {
    db.hiker.create(req.body).then(function(dbHiker) {
      console.log(req.body);
      res.json(dbHiker);
    });
  });

  // Delete a hiker by id
  app.delete("/api/hiker/:user", function(req, res) {
    db.hiker
      .destroy({
        where: {
          user: req.params.user
        }
      })
      .then(function(dbHiker) {
        res.json(dbHiker);
      });
  });

  app.get("/api/mountains", function(req, res) {
    db.example.findAll({}).then(function(data) {
      res.json(data);
    }).catch(err => {
      console.log(err);
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


