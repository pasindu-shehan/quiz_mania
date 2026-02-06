const apiRouter = require("express").Router();
const userRoutes = require("./user.routes");
const authRoutes = require("./auth.routes");
const quizSessionRoutes = require("./quizSession.routes");

apiRouter.use("/auth", authRoutes);
apiRouter.use("/user", userRoutes);
apiRouter.use("/quizSession", quizSessionRoutes);

module.exports = apiRouter;
