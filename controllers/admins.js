const Admin = require('../models/Admin');
const Seller = require('../models/Seller');

// @desc Adding Admin
// @route POST /admin/add-admin
// @access Private
exports.addAdmin = async (req, res, next) => {
  try {
    const admin = new Admin(req.body);
    await admin.save();
    return res.status(201).send(admin);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'This email already exists' });
    }
    return res.status(400).send('Unable to login', error);
  }
};

// @desc Login Admin
// @route POST /admin/login
// @access Public
exports.loginAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = admin.generateAuthToken();
    return res.header('auth-admin', token).send(token);
  } catch (error) {
    return res.status(400).send('Password or email is not valid');
  }
};

// @desc Get Seller Information
// @route GET /admin/seller
// @acccess Private
exports.getSeller = async (req, res, next) => {
  try {
    var count = await Seller.countDocuments();
    const seller = await Seller.find({});
    return res.status(200).json({ count: count, seller: seller });
  } catch (error) {
    return res.status(400).send('Server error');
  }
};
