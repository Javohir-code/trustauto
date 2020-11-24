const express = require('express');
const authAdmin = require('../middlewares/auth-admin');
const router = express.Router();
const {
  addAdmin,
  loginAdmin,
  getSeller,
  getSellerById,
  deleteSeller,
} = require('../controllers/admins');

router.route('/add-admin').post(authAdmin, addAdmin);
router.route('/login').post(loginAdmin);
router.route('/seller').get(authAdmin, getSeller);
router.route('/seller/details/:id').get(authAdmin, getSellerById);
router.route('/seller/delete/:id').delete(authAdmin, deleteSeller);

module.exports = router;
