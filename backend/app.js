const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const allRoutes = require('./routes/allRoutes')
require('dotenv').config()

const app = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


const PORT = process.env.PORT
const dbURI = process.env.DB_URI
mongoose.set('strictQuery', true);

mongoose.connect(dbURI)
.then(() => {
    console.log('connected to db')
    app.listen(PORT, () => {
    console.log(`Listening for requests on port ${PORT}...`)})
})
.catch(err => console.log(err))

// routes
// app.get('*', checkUser);
app.use(allRoutes)