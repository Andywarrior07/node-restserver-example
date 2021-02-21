const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const getUsers = async (req, res = response) => {
  const { limit = 5, skip = 0 } = req.query;
  const query = { enabled: true };

  const [users, total] = await Promise.all([
    User.find(query).limit(Number(limit)).skip(Number(skip)),
    User.countDocuments(query),
  ]);

  res.json({ total, users });
};

const createUser = async (req, res = response) => {
  const { name, email, password, role } = req.body;

  const user = new User({
    name,
    password,
    email,
    role,
  });

  const salt = bcryptjs.genSaltSync();

  user.password = bcryptjs.hashSync(password, salt);

  await user.save();

  res.status(201).json(user);
};

const updateUser = async (req, res = response) => {
  const { id } = req.params;
  const { password, google, ...data } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();

    data.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, data);

  res.json(user);
};

const deleteUser = async (req, res = response) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, { enabled: false });

  res.json(user);
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
