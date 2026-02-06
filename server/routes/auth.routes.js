const { login, logout, verifyAccessTokencontroller } = require("../controllers/auth.controller");


const authRoutes = require("express").Router();

authRoutes.post("/login", login);
authRoutes.post("/logout", logout);
authRoutes.get("/verify", verifyAccessTokencontroller);

module.exports = authRoutes;
