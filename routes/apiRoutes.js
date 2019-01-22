var db = require("../models");

module.exports = function(app) {
  // Get logged in hiker
  app.get("/api/hiker/:user", function(req, res) {
    db.hiker
      .findOne({
        where: {
          user: req.params.user
        },
        include: [db.hikes]
      })
      .then(function(dbHiker) {
        res.json(dbHiker);
      });
  });
  app.get("/api/hiker", function(req, res) {
    db.hiker.findAll({include: [db.hikes]}).then(function(dbHiker) {
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
    db.mountains.findAll({}).then(function(data) {
      console.log(data);
      res.json(data);
    }).catch(function(err) {
      console.log(err);
    });
  });
  // ***************************************************************

  // GET route for getting all of the posts
  app.get("/api/hikes", function(req, res) {
    var query = {};
    if (req.query.id) {
      query.id = req.query.id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.hikes.findAll({
      where: query,
      include: [db.hiker]
    }).then(function(dbhikes) {
      res.json(dbhikes);
    });
  });

  // Get route for retrieving a single post
  app.get("/api/hikes/:user", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.hikes.findAll({
      where: {
        user: req.params.user
      },
      include: [db.hiker]
    }).then(function(dbhikes) {
      res.json(dbhikes);
    });
  });
  app.get("/api/hikes/:user", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.hikes.findOne({
      where: {
        user: req.params.user
      },
      include: [db.hiker]
    }).then(function(dbhikes) {
      res.json(dbhikes);
    });
  });

  // POST route for saving a new post
  app.post("/api/hikes", function(req, res) {
    db.hikes.create(req.body).then(function(dbhikes) {
      res.json(dbhikes);
    });
  });

  // DELETE route for deleting posts
  app.delete("/api/hikes/:user", function(req, res) {
    db.hikes.destroy({
      where: {
        id: req.params.user
      }
    }).then(function(dbhikes) {
      res.json(dbhikes);
    });
  });

  // PUT route for updating posts
  app.put("/api/hikes", function(req, res) {
    db.hikes.update(
      req.body,
      {
        where: {
          id: req.body.user
        }
      }).then(function(dbhikes) {
      res.json(dbhikes);
    });
  });


};


