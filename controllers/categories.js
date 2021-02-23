const Category = require('../models/category');

const getCategories = async (req, res) => {
  const { limit = 5, skip = 0 } = req.query;
  const query = { enabled: true };

  const [categories, total] = await Promise.all([
    Category.find(query)
      .populate('createdBy', 'name')
      .limit(Number(limit))
      .skip(Number(skip)),
    Category.countDocuments(query),
  ]);

  res.json({ total, categories });
};

const getCategoryById = async (req, res) => {
  const { id } = req.params;

  const category = await Category.findById(id).populate('createdBy', 'name');

  return res.json(category);
};

const createCategory = async (req, res) => {
  const name = req.body.name.toUpperCase();

  const existsCategory = await Category.findOne({ name });

  if (existsCategory) {
    return res.status(400).json({ msg: 'Category already exists' });
  }

  const category = new Category({
    name,
    createdBy: req.user._id,
  });

  await category.save();

  res.status(201).json(category);
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const name = req.body.name.toUpperCase();

  const category = await Category.findByIdAndUpdate(
    id,
    { name },
    { new: true }
  );

  return res.json(category);
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const categoryDleted = await Category.findByIdAndUpdate(
    id,
    { enabled: false },
    { new: true }
  );

  return res.status(200).json(categoryDleted);
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
