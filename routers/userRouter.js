const userRouter = require("express").Router()
const userController = require("../controllers/userController")

userRouter.get("/", userController.index)

userRouter.post("/", userController.createUser)

module.exports = userRouter
