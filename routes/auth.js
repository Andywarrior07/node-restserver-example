const { Router } = require('express');
const { body } = require('express-validator');
const { login, googleSignin } = require('../controllers/auth');
const { validateRequest } = require('../middlewares/validate-request');
const router = Router();

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Email is required'),
    body('password').not().isEmpty().withMessage('Password is required'),
    validateRequest,
  ],
  login
);

router.post(
  '/google',
  [
    body('id_token').not().isEmpty().withMessage('id_token is required'),
    validateRequest,
  ],
  googleSignin
);

module.exports = router;
