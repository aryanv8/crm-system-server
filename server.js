const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const userRoute = require('./controller/userRoute')
const { updateInsights } = require("./insights.js");
const cors = require('cors')
const schedule = require("node-schedule");
const adminRoute = require('./controller/adminRoute')

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
  startScheduler();
})

const app = express()

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// User routes
app.use('/user', userRoute)

// Admin routes
app.use('/admin', adminRoute)

app.post("/insights/update", (req, res) => {
  updateInsights();
  res.send("Insights update triggered.");
});

function startScheduler() {
  schedule.scheduleJob("0 * * * *", updateInsights);
}

app.listen(PORT, () => {
  console.log(`Listening at :${PORT}...`)
})