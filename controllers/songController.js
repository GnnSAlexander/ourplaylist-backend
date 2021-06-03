const Song = require("../models/Song")
const Playlist = require("../models/Playlist")

const songController = {
  async getSongs(req, res, next) {
    const songs = await Song.find({})
    return res.json(songs)
  },
  async getSong(req, res, next) {
    const { id } = req.params

    try {
      const song = await Song.findById(id)

      if (!song) return res.status(400).send({ error: "Song doesn't exist" })

      return res.json(song)
    } catch (error) {
      next(error)
    }
  },

  async createSong(req, res, next) {
    const { title, channel_title, song_id, picture, type, playlistId } =
      req.body

    if (!title) return res.status(400).send({ error: "title is required" })

    if (!song_id) return res.status(400).send({ error: "songId is required" })

    if (!playlistId)
      return res.status(400).send({ error: "playlistId is required" })

    let playlist = null
    try {
      playlist = await Playlist.findById(playlistId)

      if (!playlist)
        return res.status(400).send({ error: "playlist not exist" })
    } catch (error) {
      next(error)
      return
    }

    const song = new Song({
      title,
      channel_title,
      picture,
      type,
      song_id,
    })

    try {
      const songSaved = await song.save()

      let songs = [...playlist.songs, songSaved.id]

      const playlistUpdate = await playlist.update({ songs }, { new: true })
      return res.json({ songSaved, playlistUpdate })
    } catch (error) {
      next(error)
    }
  },

  async deleteSong(req, res, next) {
    const { id } = req.params

    try {
      const song = await Song.findByIdAndDelete(id, async (error, doc) => {
        if (error) {
          return res.status(400).json({ error })
        }

        if (!error) {
          console.log("deleted")
          const playlist = await Playlist.findOneAndUpdate(
            { songs: id },
            { $pull: { songs: id } }
          )
          //console.log(playlist)
        }
      })

      return res.status(204).end()
    } catch (error) {
      next(error)
    }
  },
}

module.exports = songController
