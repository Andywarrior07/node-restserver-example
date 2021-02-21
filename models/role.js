const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
  role: {
    type: String,
    required: [true, 'Role is required1'],
  },
});

module.exports = model('Role', RoleSchema);
