const { Router } = require('express');
const { check, body } = require('express-validator');
const { uploads, updateImages, getImage } = require('../controllers/uploads');
const { allowedCollections } = require('../helpers/param-validators');
const { validateFile } = require('../middlewares');
const { validateRequest } = require('../middlewares/validate-request');

const router = Router();

router.get(
  '/:collection/:id',
  [
    check('id').isMongoId().withMessage('Invalid Id'),
    check('collection').custom(c =>
      allowedCollections(c, ['users', 'products'])
    ),
    validateRequest,
  ],
  getImage
);

router.post('/', validateFile, uploads);

router.put(
  '/:collection/:id',
  [
    validateFile,
    check('id').isMongoId().withMessage('Invalid Id'),
    check('collection').custom(c =>
      allowedCollections(c, ['users', 'products'])
    ),
    validateRequest,
  ],
  updateImages
);

module.exports = router;
