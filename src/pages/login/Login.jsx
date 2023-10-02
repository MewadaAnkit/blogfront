import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { request } from '../../utils/fetchApi'
import classes from './login.module.css'
//import {useDispatch} from 'react-redux'
//import { login } from '../../redux/authSlice'
import axios from 'axios'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
 // const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
   try {
      const res = await axios.post("http://localhost:5000/auth/login", {email , password });
    
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/")
    } catch (err) {
      console.log(err)
      setError(err.response.data);
    }
  };
  

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder='Email...' onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder='Password...' onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Login</button>
         <p style={{color:'red' , fontSize:'20px'}}>*{error && error}</p>

          <p>Don't have an account? <Link to='/register'>Register</Link></p>
        </form>
        
      </div>
    </div>
  )
}

export default Login