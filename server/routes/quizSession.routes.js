const {
  getQuiz,
  createSession,
  checkAnswer,
  setScore,
} = require("../controllers/quizSession.controller");

const quizSessionRoutes = require("express").Router();

quizSessionRoutes.post("/createsession", createSession);
quizSessionRoutes.get("/", getQuiz);
quizSessionRoutes.get("/checkAnswer", checkAnswer);
quizSessionRoutes.patch("/setscore", setScore);

module.exports = quizSessionRoutes;
