import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import classes from './community.module.css';

const Community = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [senderId, setSenderId] = useState('');  // Set default username
 
  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/message/get'); // Fetch messages from server
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };
  const user = JSON.parse(localStorage.getItem('currentUser'))
  const usera = user.user
  const userID = usera._id
  const token = user?.token

  useEffect(() => {
    

    fetchMessages(); 
    const interval = setInterval(() => {
      fetchMessages();
    }, 200); // 5000 milliseconds (5 seconds)

    // Clear the interval when the component is unmounted
    return () => {
      clearInterval(interval);
    };
  }, []);
  
 // console.log(options)
  const sendMessage = async () => {
  
  
    try {
     
  console.log( 'com',userID)
      const options = {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      };
      await axios.post('http://localhost:5000/message/send',{headers: options ,senderId:userID, message:message});
      setMessage('');
      console.log('success')
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className={classes.community}>
        <p>Now you can share your experiences your happiness with every one through our blog</p>
      <div className={classes.chat}>
          {messages.map((msg, index) => (
            <div key={index} className={`${classes.message} ${msg.senderId === userID ? classes.right : classes.left}`}>
              <span className={classes.sender}>{msg.sender}:</span> {msg.message}
            </div>
          ))}
        </div>
        <div className={classes.input1}>
          <input
            className={classes.message}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
          />
         
          <button className={classes.send} onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Community;


