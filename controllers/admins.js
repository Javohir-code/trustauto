const Admin = require('../models/Admin');

// @desc Adding Admin
// @route POST /admin/add-admin
// @access private
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
    return res.status(200).send(admin);
  } catch (error) {
    return res.status(400).send(error);
  }
};
