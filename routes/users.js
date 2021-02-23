const { Router } = require('express');
const { body, check } = require('express-validator');
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users');
const {
  roleValidator,
  existingEmail,
  existingUserById,
} = require('../helpers/param-validators');
const { validateRequest, validateJWT, verifyRole } = require('../middlewares/');

const router = Router();

router.get('/', getUsers);

router.post(
  '/',
  [
    body('name').not().isEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email is not valid'),
    body('email').custom(existingEmail),
    body('password')
      .isLength(6)
      .withMessage('password min length 6 characters'),
    // body('role')
    //   .isIn(['ADMIN_ROLE', 'USER_ROLE'])
    //   .withMessage('Role is not allowed'),
    body('role').custom(roleValidator),
    validateRequest,
  ],
  createUser
);

router.put(
  '/:id',
  [
    check('id', 'Invalid id').isMongoId(),
    check('id').custom(existingUserById),
    body('role').custom(roleValidator),
    validateRequest,
  ],
  updateUser
);

router.delete(
  '/:id',
  [
    validateJWT,
    verifyRole('ADMIN_ROLE', 'VENDOR-ROLE'),
    check('id', 'Invalid id').isMongoId(),
    check('id').custom(existingUserById),
    validateRequest,
  ],
  deleteUser
);

module.exports = router;
