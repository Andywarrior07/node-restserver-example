const { response } = require('express');

const getUsers = (req, res = response) => {
  const { name } = req.query;
  res.json({ msg: 'Get Api', name });
};

const createUser = (req, res = response) => {
  const { body } = req;
  console.log(body);
  res.status(201).json({ msg: 'Post Api', body });
};

const updateUser = (req, res = response) => {
  const { id } = req.params;
  res.json({ msg: 'Put Api', id });
};

const deleteUser = (req, res = response) => {
  res.json({ msg: 'Delete Api' });
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
