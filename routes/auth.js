const express = require("express");
const router = express.Router();

const AuthController = require("./../controllers/auth");

const userAuthentication = require("./../middlewares/authentication");

router.post('/register', AuthController.registerUser);
router.post('/login', AuthController.loginUser);

router.get('/me', userAuthentication.protect, AuthController.getMe);

module.exports = router;