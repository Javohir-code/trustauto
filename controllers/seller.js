const Seller = require('../models/Seller');

// @desc Buy Car from Clients
// @route POST api/sell
// @access Public
exports.sellCar = async (req, res, next) => {
  try {
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
    });

    await seller.save();

    return res.status(201).json({ seller });
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
    return res.status(200).send(seller);
  } catch (error) {
    return res.status(400).send('Server Error');
  }
}