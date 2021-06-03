const { model, Schema } = require("mongoose")

const songSchema = new Schema({
  title: String,
  channel_title: String,
  type: String,
  song_id: String,
  picture: String,
  date_added: Date,
  date_modified: Date,
})

songSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Song = model("Song", songSchema)
module.exports = Song
