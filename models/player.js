const mongoose = require('mongoose');
const playerSchema = new mongoose.Schema({
    name: {
        type: String
    },
    score: {
        type: String
    }
}, {
    timestamps: true
});


const Player = mongoose.model('Player', playerSchema);
module.exports = Player;