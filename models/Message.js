const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    
    senderId:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        requireed:true
    
    },
    sender:{
        type:String,
    },
   
    message: String,
    timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;