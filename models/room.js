const mongoose = require('mongoose');
const roomSchema = new mongoose.Schema({
    players: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Players'
        }
    ]
}, {
    timestamps: true
});


const Room = mongoose.model('Room', roomSchema);
module.exports = Room;