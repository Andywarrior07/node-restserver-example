const { Category, Role, User, Product } = require('../models/');

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

const existingCategory = async id => {
  const existingCategory = await Category.findById(id);

  if (!existingCategory) {
    throw new Error('Category does not exists');
  }
};

const existingProduct = async id => {
  const existingEntity = await Product.findById(id);

  if (!existingEntity) {
    throw new Error('Product does not exists');
  }
};

module.exports = {
  roleValidator,
  existingEmail,
  existingUserById,
  existingCategory,
  existingProduct,
};
