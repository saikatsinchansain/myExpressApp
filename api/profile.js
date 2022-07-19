var express = require('express');
var router = express.Router();
const profileController = require("../controllers/profile.controller.js");

/* GET profile listing. */
router.get('/', function(req, res, next) {
    profileController.findAll(req,res);
});

router.get('/:id', function(req, res, next) {
});


router.post('/', function(req, res, next) {
    profileController.create(req,res);
});

router.patch('/', function(req, res, next) {
});

router.delete('/', function(req, res, next) {
});

module.exports = router;
