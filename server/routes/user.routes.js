const {
  createUser,
  getUser,
  updateUser,
} = require("../controllers/user.controller");
const userRoutes = require("express").Router();

userRoutes.post("/create", createUser);
userRoutes.get("/:id", getUser);
userRoutes.patch("/:id", updateUser);

module.exports = userRoutes;
