const Admin = require('../models/Admin');
const Seller = require('../models/Seller');
const _ = require('lodash');
const aws = require('aws-sdk');
const s3 = new aws.S3({ apiVersion: '2006-03-01' });

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
    const seller = await Seller.find({}).sort({ createdAt: -1 });
    return res.status(200).json({ count: count, seller: seller });
  } catch (error) {
    return res.status(400).send('Server error');
  }
};

// @desc Get seller informations by Id
// @route GET /admin/seller/details/:id
// @access Private
exports.getSellerById = async (req, res, next) => {
  try {
    const seller = await Seller.findById(req.params.id);
    return res.status(200).send(seller);
  } catch (error) {
    return res.status(404).send('Seller info not found with given Id');
  }
};

// @desc Delete Seller informations
// @route GET /admin/seller/delete/:id
// @access Private
exports.deleteSeller = async (req, res, next) => {
  try {
    const seller = await Seller.findByIdAndRemove(req.params.id);

    var options = {
      Bucket: 'trust-autosales',
      Delete: {
        Objects: seller.Keys,
      },
    };

    s3.deleteObjects(options, function (err, data) {
      if (data) {
        console.log('File successfully deleted');
      } else {
        console.log('Check with error message ' + err);
      }
    });

    return res.status(200).send(seller);
  } catch (error) {
    return res.status(400).send('Server error occured while deleting');
  }
};
