const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../utils/response.utils");
const quizSessionService = require("../services/quizSession.service");
const { logger } = require("../utils/log.utils");

async function createSession(req, res) {
  logger.info(`QuizSessionController - createSession()`);

  try {
    const token = req.cookies.access_token;
    const { difficulty, type, category, amount } = req.query;
    let reqData = {};
    reqData.amount = amount;
    if (difficulty) {
      reqData.difficulty = difficulty;
    } else {
      reqData.difficulty = "any";
    }
    if (type) {
      reqData.type = type;
    } else {
      reqData.type = "any";
    }
    if (category) {
      reqData.category = category;
    } else {
      reqData.category = "any";
    }
    reqData.token = token;

    const session = await quizSessionService.createSession(reqData);
    sendSuccessResponse(res, session, "Questions Loaded");
  } catch (error) {
    logger.error("quizController - createSession error ", error);
    sendErrorResponse(res, error.message);
  }
}

async function getQuiz(req, res) {
  try {
    const { difficulty, type, category, amount } = req.query;
    const token = req.cookies.access_token;
    let reqData = {};
    reqData.amount = amount;
    if (difficulty) reqData.difficulty = difficulty;
    if (type) reqData.type = type;
    if (category) reqData.category = category;

    const questions = await quizSessionService.getQuiz(reqData, token);
    sendSuccessResponse(res, questions, "Questions Loaded");
  } catch (error) {
    logger.error("quizController - getQuiz error ", error);
    sendErrorResponse(res, error.message);
  }
}

async function checkAnswer(req, res) {
  try {
    const { answer, question_id } = req.query;
    const isAnswerRight = await quizSessionService.checkAnswer(
      answer,
      question_id,
    );

    sendSuccessResponse(res, isAnswerRight, "Answer Checked");
  } catch (error) {
    logger.error("quizController - checkAnswer error ", error);
    sendErrorResponse(res, error.message);
  }
}

async function setScore(req, res) {
  try {
    const token = req.cookies.access_token;
    const score = req.query.score;

    const setScore = await quizSessionService.setScore(score, token);
    sendSuccessResponse(res, setScore, "Score Stored");
  } catch (error) {
    logger.error("quizController - setScore error ", error);
    sendErrorResponse(res, error.message);
  }
}

module.exports = { getQuiz, createSession, checkAnswer, setScore };
