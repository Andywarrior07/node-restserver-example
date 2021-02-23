const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
  name: {
    type: String,
    required: [true, 'Name is required1'],
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

CategorySchema.methods.toJSON = function () {
  const { __v, enabled, ...category } = this.toObject();
  return category;
};

module.exports = model('Category', CategorySchema);
