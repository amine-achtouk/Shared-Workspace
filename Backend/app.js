const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const userRoutes = require('./routes/userRoutes')
const workspaceRoutes = require('./routes/workspaceRoutes')
const noteRoutes = require('./routes/noteRoutes')

app.use('/api/users', userRoutes)
app.use('/api/workspaces', workspaceRoutes)
app.use('/api/notes', noteRoutes)

app.get('/', (req, res) => {
  res.send('API is running...')
})

app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' })
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ message: 'Something went wrong' })
})

module.exports = app