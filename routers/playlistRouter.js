const playlistRouter = require("express").Router()
const playlistController = require("../controllers/playlistController")

playlistRouter.get("/", playlistController.getPlaylists)

playlistRouter.get("/:id", playlistController.getPlaylist)

playlistRouter.post("/", playlistController.createPlaylist)

playlistRouter.delete("/:id", playlistController.deletePlaylist)

module.exports = playlistRouter
