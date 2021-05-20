require("../mongodb")
const supertest = require("supertest")
const mongoose = require("mongoose")

const Playlist = require("../models/Playlist")
const { app, server } = require("../index")

const api = supertest(app)

const helper = require("./test_helpers")

describe("Playlist", () => {
  beforeEach(async () => {
    await Playlist.deleteMany({})

    const newPlaylist = {
      name: "Mi primera playlist",
      image: "src...",
      isPublic: true,
    }
    await api
      .post("/api/playlist")
      .send(newPlaylist)
      .expect(201)
      .expect("Content-Type", /application\/json/)
  })

  test("should create a new playlist", async () => {
    const playlistAtStart = await helper.playlistsInDb()

    const newPlaylist = {
      name: "Mi primera playlist",
      image: "src...",
      isPublic: true,
    }
    await api
      .post("/api/playlist")
      .send(newPlaylist)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const playlistAtEnd = await helper.playlistsInDb()

    expect(playlistAtEnd).toHaveLength(playlistAtStart.length + 1)
    const names = playlistAtEnd.map((p) => p.name)
    expect(names).toContain(newPlaylist.name)
  })

  test("should get a playlist", async () => {
    const playlistAtStart = await helper.playlistsInDb()

    const [playlist] = playlistAtStart

    const playlistObtained = await api
      .get("/api/playlist/" + playlist.id)
      .expect("Content-Type", /application\/json/)
      .expect(200)

    expect(playlistObtained.body.id).toContain(playlist.id)
  })

  test("should delete a playlist", async () => {
    const playlistAtStart = await helper.playlistsInDb()
    const [playlist] = playlistAtStart

    await api.delete("/api/playlist/" + playlist.id).expect(204)

    const playlistAtEnd = await helper.playlistsInDb()

    expect(playlistAtEnd).toHaveLength(playlistAtStart.length - 1)
  })

  afterAll(() => {
    mongoose.connection.close()
    server.close()
  })
})
