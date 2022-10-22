const express = require('express');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const authControllers = require('../controllers/auth/authController');
const auth = require('../middleware/auth');

const router = express.Router();

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(12).required(),
  password: Joi.string().min(6).max(12).required(),
  mail: Joi.string().email().required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).max(12).required(),
  mail: Joi.string().email().required(),
});

router.post(
  '/register',
  validator.body(registerSchema),
  authControllers.controllers.postRegister
);

router.post(
  '/login',
  validator.body(loginSchema),
  authControllers.controllers.postLogin
);

// test auth
router.get('/test', auth, (req, res) => {
  console.log(req.user);
  res.send('require passed');
});

module.exports = router;
