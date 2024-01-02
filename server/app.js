const { fetchUsers } = require('../src/app/pages/api/users');
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

app.get("/api/users", fetchUsers)

module.exports = app;