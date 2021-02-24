const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
  name: {
    type: String,
    required: [true, 'Name is required1'],
  },
  price: {
    type: Number,
    required: true,
  },
  img: { type: String },
  description: { type: String },
  available: { type: Boolean, default: true },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
});

ProductSchema.methods.toJSON = function () {
  const { __v, enabled, ...product } = this.toObject();
  return product;
};

module.exports = model('Product', ProductSchema);
