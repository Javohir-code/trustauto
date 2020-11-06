const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  VIN: {
    type: String,
    trim: true,
    required: true,
  },
  CarTrim: {
    type: String,
    required: true,
  },
  carModel: {
    type: String,
    required: true,
  },
  carMileage: {
    type: String,
    required: true,
  },
  carColor: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
  VehicleCondition: {
    type: String,
    required: true,
  },
  transmision: {
    type: String,
    required: true,
  },
  SellDate: {
    type: String,
  },
  expectedPrice: {
    type: String,
  },
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  postCode: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  message: {
    type: String,
  },
});

sellerSchema.statics.findByCredentials = async (emailAddress) => {
  const seller = await Seller.findOne({ emailAddress });
  if (!seller) {
    throw new Error('Unable to Login!');
  }

  return seller;
};

const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;
