const Seller = require('../models/Seller');

// @desc Buy Car from Clients
// @route POST api/sell
// @access Public
exports.sellCar = async (req, res, next) => {
  try {
    var images = [];
    for (var i = 0; i < req.files.length; i++) {
      images.push(req.files[0].location);
    }

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
      message: req.body.message,
      Photos: images,
    });

    await seller.save();

    return res.status(201).json({ seller: seller, images: images });
  } catch (err) {
    console.log(err);
    return res.status(500).send('Server Error');
  }
};

// @desc Seller Login
// @route POST /login
// @access Public
exports.loginSeller = async (req, res, next) => {
  try {
    const seller = await Seller.findByCredentials(req.body.emailAddress);
    const token = seller.generateAuthToken();
    return res.header('x-auth-token', token).send('Logged In');
  } catch (error) {
    return res.status(400).send('Server Error');
  }
};
