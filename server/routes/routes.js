const apiRouter = require("express").Router();
const userRoutes = require("./user.routes");
const authRoutes = require("./auth.routes");

apiRouter.use("/auth", authRoutes);
apiRouter.use("/user", userRoutes);


module.exports = apiRouter;
