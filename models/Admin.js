const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

adminSchema.statics.findByCredentials = async (email, password) => {
  const admin = await Admin.findOne({ email });
  if (!admin) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    throw new Error('Unable to login');
  }

  return admin;
};

adminSchema.pre('save', async function (next) {
  const admin = this;

  if (admin.isModified('password')) {
    const salt = await bcrypt.genSalt();
    admin.password = await bcrypt.hash(admin.password, salt);
  }
  next();
});

adminSchema.methods.generateAuthToken = () => {
  const token = jwt.sign({ _id: this._id }, process.env.TOKEN_SECRET);
  return token;
};

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
