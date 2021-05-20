require("dotenv").config()
require("./mongodb")
const express = require("express")
const cors = require("cors")
const userRouter = require("./routers/userRouter")

const handleErrors = require("./middlewares/handleErrors")
const unknownEndpoint = require("./middlewares/notFound")
const loginRouter = require("./routers/loginRouter")

const app = express()
const PORT = process.env.PORT || 3000

//app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello world")
})

app.use("/user", userRouter)
app.use("/login", loginRouter)

app.use(handleErrors)
app.use(unknownEndpoint)

const server = app.listen(PORT)
console.log("Server is running on http://localhost:" + PORT)

module.exports = { app, server }
