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

    const questions = await connection.query(
      `INSERT INTO questions (session_id, user_id, question) VALUES (?, ?, ?)`,
      [ids.sessionID, ids.userId, params.question],
    );

    for (const value of params.incorrect_answers) {
      const answers = await connection.query(
        `INSERT INTO answers (answer,question_id) VALUES(?,?)`,
        [value.toLowerCase(), questions[0].insertId],
      );
    }
    const answer = await connection.query(
      `INSERT INTO answers (answer,question_id) VALUES(?,?)`,
      [params.correct_answer.toLowerCase(), questions[0].insertId],
    );
    const correctAnswer = answer[0].insertId;

    await connection.query(
      `UPDATE questions SET answer = ? WHERE question = ?`,
      [correctAnswer, params.question],
    );

    return questions;
  } catch (error) {
    throw error;
  }
}

async function getIdOfAnswer(answer, question_id) {
  try {
    const ans = await connection.query(
      `SELECT * FROM answers WHERE answer=? AND question_id=?`,
      [answer.toLowerCase(), question_id],
    );
    return ans[0][0].id;
  } catch (error) {
    throw error;
  }
}

async function checkAnswer(question_id, ansId) {
  try {
    const ans = await connection.query(
      `SELECT * FROM questions WHERE id=? AND answer=?`,
      [question_id, ansId],
    );

    if (ans[0].length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
}

async function setScore(score, session_id) {
  try {
    const marks = await connection.query(
      `UPDATE quiz_sessions SET score = ? WHERE id = ?`,
      [score, session_id],
    );
    return marks;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createQuizSession,
  getSessionAndUserIdByEmail,
  addQuestions,
  getIdOfAnswer,
  checkAnswer,
  setScore,
};
