const {
  generateAccessToken,
  verifyAccessToken,
} = require("../services/auth.service");
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../utils/response.utils");
const authService = require("../services/auth.service");

async function login(req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const token = await generateAccessToken(email, password);
    res.cookie("access_token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return sendSuccessResponse(res, { token }, "Login Successfully", 200);
  } catch (error) {
    return sendErrorResponse(res, error.message);
  }
}

async function logout(req, res) {
  try {
    res.clearCookie("token");
    return sendSuccessResponse(res, {}, "Logout Successfully", 200);
  } catch (error) {
    return sendErrorResponse(res, error.message);
  }
}

async function verifyAccessTokencontroller(req, res) {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      throw new Error("Access token is missing or malformed");
    }
    const verifyAccessToken = await authService.verifyAccessToken(token);
    return sendSuccessResponse(res, verifyAccessToken, "Token Verified", 200);
  } catch (error) {
    return sendErrorResponse(res, error.message);
  }
}

module.exports = { login, logout, verifyAccessTokencontroller };
