const Seller = require('../models/Seller');


// @desc Buy Car from Clients
// @route POST /api/sell
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

    return res.status(201).send(seller);
  } catch (err) {
    console.log(err);
    return res.status(500).send('Server Error');
  }
};
