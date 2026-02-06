const { getQuiz } = require("../controllers/quizSession.controller");

const quizSessionRoutes = require("express").Router();

quizSessionRoutes.get("/", getQuiz);

module.exports = quizSessionRoutes;
