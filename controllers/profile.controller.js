const mongoService = require('../services/mongo.service');
const config = require("../config/db.config");

exports.findAll = (req, res) => {
  dbo = mongoService.db.db(config.mongodb.db);
  dbo.collection("profile").find({}).toArray(function(err, result) {
    if (err) throw err;
    res.send(result);
  });
};

exports.create = (req, res) => {
  dbo = mongoService.db.db(config.mongodb.db);
  dbo.collection("profile").insertOne(req.body, function(err, res) {
    if (err) throw err;
    res.send("Success");
  });
  
};