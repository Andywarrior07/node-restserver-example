const { Router } = require('express');
const { body, check } = require('express-validator');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/products');
const { existingProduct } = require('../helpers/param-validators');
const {
  validateRequest,
  validateJWT,
  isAdminUser,
} = require('../middlewares/');

const router = Router();

router.get('/', getProducts);

router.get(
  '/:id',
  [
    check('id', 'Invalid id').isMongoId(),
    check('id').custom(existingProduct),
    validateRequest,
  ],
  getProductById
);

router.post(
  '/',
  [
    validateJWT,
    body('name').not().isEmpty().withMessage('Name is required'),
    body('price').not().isEmpty().withMessage('Price is required'),
    body('category').not().isEmpty().withMessage('Category is required'),
    body('category').isMongoId().withMessage('Invalid category id'),
    validateRequest,
  ],
  createProduct
);

router.put(
  '/:id',
  [
    validateJWT,
    check('id', 'Invalid id').isMongoId(),
    check('id').custom(existingProduct),
    validateRequest,
  ],
  updateProduct
);

router.delete(
  '/:id',
  [
    validateJWT,
    isAdminUser,
    check('id', 'Invalid id').isMongoId(),
    check('id').custom(existingProduct),
    validateRequest,
  ],
  deleteProduct
);

module.exports = router;
