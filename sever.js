const express = require('express')
const http = require('http')
const path = require('path')
const socketIO = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

const publicPath = path.join(__dirname, 'public')
app.use(express.static(publicPath))

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/index.html')
})

/// TODO: Rota para chat

io.on( 'connection', (socket) => {

    socket.on('mensagem', (mensagem) => {
        io.emit('mensagem', mensagem)
    })

    socket.on('disconnect', () => {})

})

const PORT = 3000
server.listen(PORT, () =>{
    console.log(`Servidor ouvindo na porta ${PORT}`)
})