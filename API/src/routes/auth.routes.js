const { Router, application } = require('express');
const router = Router();

const { login, register, logout, profile, verifyToken } = require('../controllers/auth.controller');
const { auth} = require("../middlewares/validateToken.js");
const { validateSchema } = require("../middlewares/validator.middleware");
const { registerSchema, loginSchema } = require("../schemas/auth.schema")


router.post('/register', validateSchema(registerSchema), register);
router.post('/login',validateSchema(loginSchema), login);
router.post('/logout', logout);
router.get('/verify', verifyToken);
router.get('/profile', auth , profile);

module.exports = router
