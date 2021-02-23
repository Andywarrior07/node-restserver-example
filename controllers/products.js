const Product = require('../models/product');

const getProducts = async (req, res) => {
  const { limit = 5, skip = 0 } = req.query;
  const query = { enabled: true };

  const [products, total] = await Promise.all([
    Product.find(query)
      .populate('createdBy', 'name')
      .populate('category', 'name')
      .limit(Number(limit))
      .skip(Number(skip)),
    Product.countDocuments(query),
  ]);

  res.json({ total, products });
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id).populate('createdBy', 'name');

  return res.json(product);
};

const createProduct = async (req, res) => {
  const name = req.body.name.toUpperCase();
  const { estado, user, ...data } = req.body;

  const existsProduct = await Product.findOne({
    name: data.name.toUpperCase(),
  });

  if (existsProduct) {
    return res.status(400).json({ msg: 'Product already exists' });
  }

  const product = new Product({
    ...data,
    name: data.name.toUpperCase(),
    createdBy: req.user._id,
  });

  await product.save();

  res.status(201).json(product);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;

  if (data.name) {
    data.name = req.body.name.toUpperCase();
  }

  const product = await Product.findByIdAndUpdate(id, data, { new: true });

  return res.json(product);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const productDleted = await Product.findByIdAndUpdate(
    id,
    { enabled: false },
    { new: true }
  );

  return res.status(200).json(productDleted);
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
