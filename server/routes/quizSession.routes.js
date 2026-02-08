const {
  getQuiz,
  createSession,
} = require("../controllers/quizSession.controller");

const quizSessionRoutes = require("express").Router();

quizSessionRoutes.post("/createsession", createSession);
quizSessionRoutes.get("/", getQuiz);

module.exports = quizSessionRoutes;
