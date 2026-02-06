const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../utils/response.utils");
const quizSessionService = require("../services/quizSession.service");

async function getQuiz(req, res) {
  try {
    const { difficulty, type, category, amount } = req.query;
    const reqData = {};
    reqData.amount = amount;
    if (difficulty) reqData.difficulty = difficulty;
    if (type) reqData.type = type;
    if (category) reqData.category = category;

    const questions = await quizSessionService.getQuiz(reqData);
    sendSuccessResponse(res, questions, "Questions Loaded");
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
}

module.exports = { getQuiz };
