const bcrypt = require("bcrypt")
const User = require("../models/User")

const userController = {
  index(req, res) {
    res.send("NOT IMPLEMENT")
  },
  async createUser(req, res, next) {
    const body = req.body
    console.log(body)

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    try {
      const savedUser = await user.save()

      res.status(201).json(savedUser)
    } catch (error) {
      next(error)
    }
  },
}

module.exports = userController
