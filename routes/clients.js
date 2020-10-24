const express = require('express');
const { sellCar } = require('../controllers/clients');
const router = express.Router();


router.route('api/sell').post(sellCar);


module.exports = router;