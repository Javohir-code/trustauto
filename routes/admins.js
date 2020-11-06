const express = require('express');
const router = express.Router();
const { addAdmin, loginAdmin, getSeller } = require('../controllers/admins');

router.route('/add-admin').post(addAdmin);
router.route('/login').post(loginAdmin);
router.route('/seller').get(getSeller);


module.exports = router;