const express = require('express');
const http = require('http');
const socketIo = require('socket.io')
const db = require('./config/database');
const User = require('./models/player');
const Room = require('./models/room');
const Player = require('./models/player');
const { default: mongoose } = require('mongoose');
const app = express();
const server = http.createServer(app)
const io = socketIo(server)

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// testing connection

// app.post('/', async(req, res) => {
//     const data = req.body
//     const result = new User(data);
//     await result.save()
//     res.status(200).json('Added')
// })

app.post('/create-user', async(req, res) => {
    const user = new Player(req.body);
    await user.save()
    res.status(200).json(user)
})

app.post('/create-room', async(req, res) => {
    const playerIds = req.body.players

    // Create a new Room instance with the converted playerIds
    const room = new Room({ players: playerIds });

    // Save the room to the database
    await room.save();

    res.status(200).json(room);
})

app.get('/create-room', async (req, res) => {
    const rooms = await Room.find().populate('players')
    res.status(200).json(rooms)
});
  
app.post('/join-room/:roomId', async (req, res) => {
    const { roomId } = req.params;
  
    try {
      const room = await Room.findById(roomId);
  
      if (!room) {
        return res.status(404).json({ error: 'Room not found.' });
      }
  
      if (room.players.length >= 2) {
        return res.status(400).json({ error: 'Room is full.' });
      }
  
      // Add the user to the room
      room.players.push(req.body.playerId);
      await room.save();
  
      res.status(200).json(room);
    } catch (error) {
      res.status(500).json({ error: 'Error joining room.' });
    }
});

server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})