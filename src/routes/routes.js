const express = require("express");
const UserController = require("../controllers/user");
const authenticateUser = require("../middlewares/authenticateUser");


const router = express.Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/user", authenticateUser, UserController.getUser);
router.post("/logout", UserController.logout);

module.exports = router;