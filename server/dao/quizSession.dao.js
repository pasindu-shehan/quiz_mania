const connection = require("../config/config");
const userDao = require("./user.dao");
const categoryDao = require("./categories.dao");

async function createQuizSession(params) {
  try {
    const user = await userDao.getUserByEmail(params.email);
    const categoryId = await categoryDao.getIdOfCategory(`${params.category}`);
    const session = await connection.query(
      `INSERT INTO quiz_sessions (user_id,category_id,difficulty,type) VALUES ('${user[0][0].id}','${categoryId}','${params.difficulty}','${params.type}')`,
    );

    return session;
  } catch (error) {
    throw error;
  }
}
async function getSessionAndUserIdByEmail(email) {
  try {
    const user = await userDao.getUserByEmail(email);
    const userId = user[0][0].id;
    const session = await connection.query(
      `SELECT * FROM quiz_sessions WHERE ${userId} = 1 ORDER BY created_at DESC LIMIT 1;`,
    );
    const sessionID = session[0][0].id;
    return { sessionID, userId };
  } catch (error) {
    throw error;
  }
}
async function addQuestions(params, email) {
  try {
    const ids = await getSessionAndUserIdByEmail(email);

    // const questions = connection.query(
    //   `INSERT INTO questions (session_id,user_id,question,answer) VALUES ("${ids.sessionID}","${ids.userId}","${params.question}","${params.answer}"))`,
    // );
    const questions = await connection.query(
      `INSERT INTO questions (session_id, user_id, question, answer) VALUES (?, ?, ?, ?)`,
      [ids.sessionID, ids.userId, params.question, params.correct_answer],
    );
    return questions;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createQuizSession,
  getSessionAndUserIdByEmail,
  addQuestions,
};
