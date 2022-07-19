var express = require('express');
var router = express.Router();
const lotteriesController = require("../controllers/lottery.controller.js");

/* GET users listing. */
router.get('/', function(req, res, next) {
    lotteriesController.findAll(req,res)
});

router.get('/:id', function(req, res, next) {
    lotteriesController.findOne(req,res)
});


router.post('/', function(req, res, next) {
    lotteriesController.create(req,res);
});

router.patch('/', function(req, res, next) {
    res.send('update');
});

router.delete('/', function(req, res, next) {
    res.send('delete');
});

module.exports = router;
