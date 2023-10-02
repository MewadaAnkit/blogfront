const express = require("express");
const MessageController = express.Router();
const Message = require("../models/Message");
const verifyToken = require('../middlewares/verifyToken');
const cors = require('cors')
const User = require('../models/User')

MessageController.post('/send' , verifyToken, async (req, res) => {
  //console.log('working' , req.body)\
  //console.log(req.body.headers)
    const { senderId ,  message } = req.body;
 // console.log(senderId , message)
    const senderData = await User.findById(senderId)
    const sender = senderData.username
  //  console.log(senderData)
    const newMessage = new Message({ senderId, message, sender});
    try {
      await newMessage.save();
      res.status(201).json(newMessage);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
MessageController.get('/get' , async (req, res) => {
    try {
      const messages = await Message.find().sort({ timestamp: 1 });
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


module.exports = MessageController;
