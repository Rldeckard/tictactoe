const express = require('express')
const app = express()

app.set('view_engine', 'ejs')
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.send('Hello World')
})

server = app.listen("3000")
const io = require('socket.io')(server)

io.on('connection', (socket) => {
  console.log('new user connected')

  socket.username = 'guest'
  socket.on('change_username', (data) => {
    socket.username = data.username
  })
})
