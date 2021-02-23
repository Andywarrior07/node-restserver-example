const { Router } = require('express');
const { body, check } = require('express-validator');
const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categories');
const { existingCategory } = require('../helpers/param-validators');
const {
  validateRequest,
  validateJWT,
  isAdminUser,
} = require('../middlewares/');

const router = Router();

router.get('/', getCategories);

router.get(
  '/:id',
  [
    check('id', 'Invalid id').isMongoId(),
    check('id').custom(existingCategory),
    validateRequest,
  ],
  getCategoryById
);

router.post(
  '/',
  [
    validateJWT,
    body('name').not().isEmpty().withMessage('Name is required'),
    validateRequest,
  ],
  createCategory
);

router.put(
  '/:id',
  [
    validateJWT,
    check('id', 'Invalid id').isMongoId(),
    check('id').custom(existingCategory),
    body('name').not().isEmpty().withMessage('Name is required'),
    validateRequest,
  ],
  updateCategory
);

router.delete(
  '/:id',
  [
    isAdminUser,
    validateJWT,
    check('id', 'Invalid id').isMongoId(),
    check('id').custom(existingCategory),
    validateRequest,
  ],
  deleteCategory
);

module.exports = router;
