require('dotenv').config()
const express = require('express')
const connectDB = require('./config/database')
const userRoutes = require('./routes/userRoutes')
const documentRoutes = require('./routes/documentRoutes')

const app = express()

app.use(express.json())
connectDB()

app.use('/api', userRoutes)
app.use('/api', documentRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
