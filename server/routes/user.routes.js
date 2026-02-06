const { createUser, getUser, updateUser } = require("../controllers/user.controller");
const userRoutes = require("express").Router();
const Authenticated = require("../middleware/auth.middleware");

userRoutes.post("/create", createUser);
userRoutes.get("/:id", getUser);
userRoutes.patch("/:id", Authenticated, updateUser);

module.exports = userRoutes;
