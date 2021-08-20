const express = require("express");
const router = express.Router();

const UsersController = require("./../controllers/users");

const userAuthentication = require("./../middlewares/authentication");

router.get('/', userAuthentication.protect, UsersController.getUsers);
router.get('/:id', UsersController.getUser);
router.post('/', UsersController.createUser);
router.put('/:id', UsersController.updateUser);
router.delete('/:id', UsersController.deleteUser);

router.post('/getUserData', UsersController.getUserData);

module.exports = router;