const { ObjectId } = require('mongoose').Types;
const { User, Product, Category } = require('../models');

const search = (req, res) => {
  const { collection, term } = req.params;
  const allowedCollections = ['products', 'categories', 'users'];
  const searchUsers = async (term, res) => {
    const isMongoId = ObjectId.isValid(term);

    if (isMongoId) {
      const user = await User.findById(term);
      return res.json({ results: user ? [user] : [] });
    }

    const users = await User.find({
      $or: [
        { name: { $regex: term, $options: 'i' } },
        { email: { $regex: term, $options: 'i' } },
      ],
      $and: [{ enabled: true }],
    });

    return res.json({ results: users });
  };
  const searchProducts = async (term, res) => {
    const isMongoId = ObjectId.isValid(term);

    if (isMongoId) {
      const product = await Product.findById(term).populate('category', 'name');
      return res.json({ results: product ? [product] : [] });
    }

    const products = await Product.find({
      $or: [{ name: { $regex: term, $options: 'i' } }],
      $and: [{ enabled: true }],
    }).populate('category', 'name');

    return res.json({ results: products });
  };
  const searchCategories = async (term, res) => {
    const isMongoId = ObjectId.isValid(term);

    if (isMongoId) {
      const category = await Category.findById(term);
      return res.json({ results: category ? [category] : [] });
    }

    const categories = await Category.find({
      $or: [{ name: { $regex: term, $options: 'i' } }],
      $and: [{ enabled: true }],
    });

    return res.json({ results: categories });
  };

  if (!allowedCollections.includes(collection.toLowerCase())) {
    return res.status(400).json({ msg: 'Invalid collection' });
  }

  switch (collection) {
    case 'products':
      searchProducts(term, res);
      break;
    case 'categories':
      searchCategories(term, res);
      break;
    case 'users':
      searchUsers(term, res);
      break;
    default:
      return res.status(500).json({ msg: 'Search error' });
  }
};

module.exports = { search };
