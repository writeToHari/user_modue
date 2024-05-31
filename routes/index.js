const express = require('express')

const userRoutes = require('./userRoute')

const app = express()


app.use('/user', userRoutes)

module.exports = app