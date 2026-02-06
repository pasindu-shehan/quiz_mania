const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../utils/response.utils");
const userService = require("../services/user.service");

async function createUser(req, res) {
  try {
    let data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };
    let createUser = await userService.createUser(data);
    sendSuccessResponse(res, createUser, "User Created Successfully", 200);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
}

async function getUser(req, res) {
  try {
    const user = await userService.getUser(req.params.id);
    sendSuccessResponse(res, user, "User loaded Successfully", 200);

  } catch (error) {
    sendErrorResponse(res, error.message);

  }
}

async function updateUser(req, res) {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    sendSuccessResponse(res, user, "User updated Successfully", 200);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
}

module.exports = { createUser, getUser, updateUser };
