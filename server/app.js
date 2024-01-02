const { fetchUsers, postUser } = require('../src/app/api/users');
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

app.use(express.json())

app.get("/api/users", fetchUsers)

app.post("/api/users", postUser)

module.exports = app;