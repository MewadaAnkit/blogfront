import React, { useEffect } from 'react'
import classes from './navbar.module.css'
import { Link, json } from 'react-router-dom'
import womanImg from '../../assets/woman.jpg'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [showModal, setShowModal] = useState(false)
  const [username, setUsername] = useState(null);
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    // console.log(user.user.username)
    if (user && user.user.username) {

      setUsername(user.user.username);
    }
  }, []);
  const handlelogout = () => {
    localStorage.clear();
    navigate('/')
  }
  //const username = user?.username
  //console.log(username)
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>

        <div className={classes.left}>
          <Link to='/'>Life Yessence</Link>
        </div>
        <ul className={classes.center}>

          <li className={classes.listItem}>Home</li>
          <li className={classes.listItem}>About</li>
          <li className={classes.listItem}>Categories</li>
          <Link to='/forum'><li className={classes.listItem}>Varta(messages)</li> </Link>
          <li className={classes.listItem}>Privacy Policy</li>
          <li className={classes.listItem}>Terms and conditions</li>
        </ul>
        <div className={classes.right}>
          <img onClick={() => setShowModal(prev => !prev)} src={womanImg} className={classes.img} />
          
        {username ? (
          <p>{username}</p>
        ) : (
          <Link to="/login" style={{ textDecoration: 'none', color: 'white' }}>
            <p>Login</p>
          </Link>
        )}
        {showModal &&
          <div className={classes.modal}>
            <Link to='/create'>Create</Link>
            <span onClick={handlelogout}>Logout</span>
          </div>
        }
      </div>
    </div>
    </div >
  )
}

export default Navbar