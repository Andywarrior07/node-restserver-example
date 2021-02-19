const { Router } = require('express');
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users');
const router = Router();

router.get('/', getUsers);

router.post('/', createUser);

router.put('/:id', updateUser);

router.delete('/', deleteUser);

module.exports = router;
