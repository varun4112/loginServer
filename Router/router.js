const express = require("express");
const router = new express.Router();
const userController = require("../Controller/userController");

// register route for user registration
router.post("/api/register", userController.register);

// login
router.post("/api/login", userController.login);

module.exports = router;
