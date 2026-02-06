const { hashSync } = require("bcrypt");
require("dotenv").config();

const userDao = require("../dao/user.dao");

async function createUser(data) {
  try {
    const isUserExist = await userDao.isUserExist(data.email);
    if (isUserExist) {
      throw new Error("User Already Exist");
    }
    const hashedPassword = hashSync(
      data.password,
      parseInt(process.env.HASH_SALT_ROUNDS),
    );
    data.password = hashedPassword;
    const createUser = await userDao.createUser(data);
    return createUser;
  } catch (error) {
    throw error;
  }
}

async function getUser(id) {
  try {
    const user = await userDao.getUserbyId(id);
    return user;
  } catch (error) {
    throw error;
  }
}

async function updateUser(id, data) {
  try {
    const isUserExist = await userDao.isUserExist(data.email);
    if (isUserExist) {
      throw new Error("User Already Exist");
    }
    const hashedPassword = hashSync(
      data.password,
      parseInt(process.env.HASH_SALT_ROUNDS),
    );
    data.password = hashedPassword;
    const user = await userDao.updateUser(id, data);
    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = { createUser, getUser, updateUser };
