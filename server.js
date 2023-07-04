const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const userRoute = require('./controller/userRoute')
const cors = require('cors')

require('dotenv').config()

// constanst
const PORT = process.env.PORT || 4500

// middlewares
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URI)


const db = mongoose.connection

db.on('error', () => {
  console.log('Error occured from the database')
})

db.once('open', () => {
  console.log('Successfully opened the database')
})

const app = express()

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/user', userRoute)

app.listen(PORT, () => {
  console.log(`Listening at :${PORT}...`)
})