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
      const question = await quizSessionDao.addQuestions(value, user_email);
      const questionId = question[0].insertId;
      value.questionId = questionId;
      delete value.correct_answer;
      delete value.incorrect_answers;
    }

    return questions;
  } catch (error) {
    throw error;
  }
}

module.exports = { getQuiz, createSession };
