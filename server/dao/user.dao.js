const connection = require("../config/config");

async function createUser(
  data = {
    name: "",
    email: "",
    password: "",
  },
) {
  try {
    const user = await connection.query(
      `INSERT INTO users (name,email,password) VALUES ('${data.name}','${data.email}','${data.password}')`,
    );
    return user;
  } catch (error) {
    throw error;
  }
}

async function isUserExist(email) {
  try {
    const [user] = await connection.query(
      `SELECT * FROM users WHERE email="${email}"`,
    );

    if (user.length === 0) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    throw error;
  }
}

async function getUserbyId(id) {
  try {
    const [user] = await connection.query(`SELECT * FROM users WHERE id = ${id}`);
    return user[0];
  } catch (error) {
    throw error;
  }
}


async function updateUser(id, data) {
  try {
    const user = await connection.query(`UPDATE users SET name = '${data.name}', email = '${data.email}', password = '${data.password}' WHERE id = ${id}`);
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByEmail(email) {
  try {
    const user = await connection.query(`SELECT * FROM users WHERE email = '${email}'`);
    return user;
  } catch (error) {
    throw error;
  }
}


module.exports = { createUser, isUserExist, getUserbyId, updateUser, getUserByEmail };
