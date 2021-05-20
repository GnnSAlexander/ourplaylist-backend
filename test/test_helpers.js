const User = require("../models/User")
const Playslist = require("../models/Playlist")

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}

const playlistsInDb = async () => {
  const playlist = await Playslist.find({})
  return playlist.map((p) => p.toJSON())
}

module.exports = {
  playlistsInDb,
  usersInDb,
}
