const userDao = require("../dao/user.dao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function generateAccessToken(email, password) {
  try {
    const [user] = await userDao.getUserByEmail(email);
    if (user.length === 0) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordMatched = bcrypt.compareSync(password, user[0].password);
    if (isPasswordMatched) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      return token;
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    throw error;
  }
}

async function verifyAccessToken(token) {
  if (!token) {
    throw new Error("Access token missing");
  }
  try {
    let decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userDao.isUserExist(decoded.email);
    user.isAuthenticated = true;
    if (user) {
      return user;
    } else {
      return "user not found";
    }
  } catch (error) {
    throw error;
  }
}

module.exports = { generateAccessToken, verifyAccessToken };
