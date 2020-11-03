const express = require('express');
const multer = require('multer');
const { sellCar, upload } = require('../controllers/clients');
const router = express.Router();


router.route('/api/sell').post(upload.array('Photos'), sellCar);


module.exports = router;





