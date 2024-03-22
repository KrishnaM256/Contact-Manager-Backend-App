const express = require('express')
const errorHandler = require('./middleware/errorHandler')
const dotenv = require('dotenv').config()
const connectDB = require('./config/dbConnection')

connectDB()
const app = express()

const port = process.env.PORT || 5000

app.use(express.json()) // middleware for body parser if user gives input

app.use('/api/contacts', require('./routes/contactRoutes'))

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server running on ${port}`)
})