const { Router } = require('express');
const { body, check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validateRequest } = require('../middlewares/validate-request');
const router = Router();

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Email is required'),
    body('password').not().isEmpty().withMessage('Password isRequired'),
    validateRequest,
  ],
  login
);

module.exports = router;
