const express = require('express');
const router = express.Router();
const {
  addAdmin,
  loginAdmin,
  getSeller,
  getSellerById,
  deleteSeller,
} = require('../controllers/admins');

router.route('/add-admin').post(addAdmin);
router.route('/login').post(loginAdmin);
router.route('/seller').get(getSeller);
router.route('/seller/details/:id').get(getSellerById);
router.route('/seller/delete/:id').delete(deleteSeller);

module.exports = router;
