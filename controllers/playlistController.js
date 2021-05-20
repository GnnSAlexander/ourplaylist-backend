const Playlist = require("../models/Playlist")

const playlistController = {
  async getPlaylists(req, res) {
    const playlist = await Playlist.find({})

    res.json(playlist)
  },
  async getPlaylist(req, res, next) {
    const { id } = req.params

    try {
      const playlist = await Playlist.findById(id)

      res.json(playlist)
    } catch (error) {
      next(error)
    }
  },
  async createPlaylist(req, res, next) {
    const body = req.body

    if (!body?.name) {
      res.status(400).send({ error: "name is required" })
    }

    const playlist = new Playlist({
      name: body.name,
      image: body.image || "",
      isPublic: body.isPublic || false,
      date_added: new Date(),
      date_modified: new Date(),
    })

    try {
      const playlistSaved = await playlist.save()

      res.status(201).json(playlistSaved)
    } catch (error) {
      next(error)
    }
  },

  async deletePlaylist(req, res) {
    const { id } = req.params

    try {
      await Playlist.findByIdAndDelete(id)
      res.status(204).end()
    } catch (error) {
      next(error)
    }
  },
}

module.exports = playlistController
