const Role = require('../models/role');
const User = require('../models/user');

const roleValidator = async (role = '') => {
  const existsRole = await Role.findOne({ role });

  if (!existsRole) {
    throw new Error(`Role ${role} is not allowed`);
  }
};

const existingEmail = async email => {
  const existingEmail = await User.findOne({ email });

  if (existingEmail) {
    throw new Error('Email already exists');
  }
};

const existingUserById = async id => {
  const existingUser = await User.findById(id);

  if (!existingUser) {
    throw new Error('User does not exists');
  }
};

module.exports = {
  roleValidator,
  existingEmail,
  existingUserById,
};
