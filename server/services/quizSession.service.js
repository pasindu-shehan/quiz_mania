const axios = require("axios");
const quizSessionDao = require("../dao/quizSession.dao");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function createSession(params) {
  try {
    let decoded = jwt.verify(params.token, process.env.JWT_SECRET);
    params.email = decoded.email;
    const session = await quizSessionDao.createQuizSession(params);
    return session;
  } catch (error) {
    throw error;
  }
}

async function getQuiz(params, token) {
  try {
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_email = decoded.email;
    let string = "";
    Object.keys(params).forEach((value) => {
      string = string + `${value}=${params[value]}&`;
    });
    const last = string.split("");
    last.pop();
    const parameters = last.join("");

    let response = await axios.get(`https://opentdb.com/api.php?${parameters}`);
    // Adding all answers
    let questions = response.data.results;

    questions.forEach((value) => {
      if (value.type == "multiple") {
        data = [];
        value.incorrect_answers.forEach((e) => {
          let randNum = Math.random() * 5;
          data.splice(randNum, 0, e);
        });

        data.splice(Math.random() * 5, 0, value.correct_answer);
        value.all_answers = data;
      }
      if (value.type == "boolean") {
        value.all_answers = ["True", "False"];
      }
    });
    // Add questions to database

    for (const value of questions) {
      let questions = await quizSessionDao.addQuestions(value, user_email);
      const questionId = questions[0].insertId;
      value.questionId = questionId;
      delete value.correct_answer;
      delete value.incorrect_answers;
    }

    return questions;
  } catch (error) {
    throw error;
  }
}

async function checkAnswer(answer, question_id) {
  try {
    let ansId = await quizSessionDao.getIdOfAnswer(answer, question_id);
    const isAnswerRight = await quizSessionDao.checkAnswer(question_id, ansId);

    return isAnswerRight;
  } catch (error) {
    throw error;
  }
}

async function setScore(score, token) {
  try {
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;
    const ids = await quizSessionDao.getSessionAndUserIdByEmail(email);
    const marks = await quizSessionDao.setScore(score, ids.sessionID);
    return marks;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getQuiz, createSession, checkAnswer, setScore };
