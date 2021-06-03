const songController = require("../controllers/songController")

const songRouter = require("express").Router()

songRouter.get("/", songController.getSongs)

songRouter.get("/:id", songController.getSong)

songRouter.post("/", songController.createSong)

songRouter.delete("/:id", songController.deleteSong)

module.exports = songRouter
