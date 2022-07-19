const db = require("../models");
const Lotteries = db.lotteries;
const operation = db.Sequelize.Op;

// Create a new Lottery
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a Lottery
  const lottery = {
    name: req.body.name,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };
  // Save Lottery in the database
  Lotteries.create(lottery)
    .then(data => {
      res.status(201).send(
        {
          name: data.name,
          description: data.description
        });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Lottery."
      });
    });
};

// Retrieve all Lotteries from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  Lotteries.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving lotteries."
      });
    });
};
// Find a single Lottery with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Lotteries.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Lottery with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Lottery with id=" + id
      });
    });
};
// Update a Lottery by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Lotteries.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Lottery was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Lottery with id=${id}. Maybe Lottery was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Lottery with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  
};
// Delete all Lotteries from the database.
exports.deleteAll = (req, res) => {
  
};
// Find all published Lotteries
exports.findAllPublished = (req, res) => {
  
};