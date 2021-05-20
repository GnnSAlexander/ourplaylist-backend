const { model, Schema } = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const userSchema = new Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
    unique: true,
  },
  passwordHash: String,
  createAt: Date,
  modifiedAt: Date,
})

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  },
})

userSchema.plugin(uniqueValidator)

const User = model("User", userSchema)

module.exports = User
