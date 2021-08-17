const express = require("express");
const router = express.Router();

const UsersController = require("./../controllers/users");

router.get('/', UsersController.getUsers);
router.get('/:id', UsersController.getUser);
router.post('/', UsersController.createUser);
router.put('/:id', UsersController.updateUser);
router.delete('/:id', UsersController.deleteUser);

module.exports = router;