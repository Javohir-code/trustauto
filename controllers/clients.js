const Seller = require('../models/Seller');
const path = require('path');
const multer = require('multer');
const uuid = require('uuid').v4;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const id = uuid();
    const filePath = `cars/${id}${ext}`;
    cb(null, filePath);
  },
});

exports.upload = multer({ storage });

// @desc Buy Car from Clients
// @route POST api/sell
// @access Public
exports.sellCar = async (req, res, next) => {
  try {
    const fileName = req.file != null ? req.file.filename : null;
    const seller = new Seller({
      VIN: req.body.VIN,
      CarTrim: req.body.CarTrim,
      carModel: req.body.carModel,
      carMileage: req.body.carMileage,
      carColor: req.body.carColor,
      key: req.body.key,
      VehicleCondition: req.body.VehicleCondition,
      transmision: req.body.transmision,
      SellDate: req.body.SellDate,
      expectedPrice: req.body.expectedPrice,
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      emailAddress: req.body.emailAddress,
      phoneNumber: req.body.phoneNumber,
      postCode: req.body.postCode,
      Photos: fileName,
      message: req.body.message,
    });

    await seller.save();

    return res.status(201).send(seller);
  } catch (err) {
    console.log(err);
    return res.status(500).send('Server Error');
  }
};
