const connection = require("../config/config");

async function getIdOfCategory(params) {
  try {
    const data = await connection.query(
      `SELECT * FROM categories WHERE name="${params}"`,
    );
    return data[0][0].id;
  } catch (error) {
    throw error;
  }
}

module.exports = { getIdOfCategory };
