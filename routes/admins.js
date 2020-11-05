const express = require('express');
const router = express.Router();
const { addAdmin, loginAdmin } = require('../controllers/admins');

router.route('/add-admin').post(addAdmin);
router.route('/login').post(loginAdmin);


module.exports = router;