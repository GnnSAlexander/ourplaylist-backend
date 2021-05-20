const { model, Schema, SchemaTypeOptions } = require("mongoose")

const playlistSchema = new Schema({
  name: String,
  image: String,
  songs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Song",
    },
  ],
  isPublic: Boolean,
  date_added: Date,
  date_modified: Date,
})

playlistSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Playlist = model("Playlist", playlistSchema)
module.exports = Playlist
