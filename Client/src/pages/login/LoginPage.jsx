import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './loginPage.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Alert from '@mui/material/Alert';

const LoginPage = () => {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(username.length > 0 && password.length > 0){
      try{
          const res = await axios.post(`/api/auth/login`,{
          username:username,
          password:password,
          }); 
          localStorage.setItem('user',JSON.stringify(res.data));
          navigate('/');
      }catch(err){
        setErrorMessage("Username or password are wrong!");
        setTimeout(()=> {
          setErrorMessage()
        }, 3000);
      }
    }else{
      setErrorMessage("Username or password field are empty. You need to enter username and password to enter app!");
        setTimeout(()=> {
          setErrorMessage()
        }, 3000);
    }
  }
  useEffect(()=>{
    JSON.parse(localStorage.getItem('user')) && navigate('/');
  },[]);
  return (
    <div className='login'>
        <div className='loginFormDiv'>
            <span className='formTitle'>Login to Smart Greenhouse</span>
            <form onSubmit={handleSubmit} className='loginForm'>
                <input onChange={(e)=>setUsername(e.target.value)} className='inputEmail' type='text' placeholder='Username' />
                <input onChange={(e)=>setPassword(e.target.value)} className='inputPassword' type='password' placeholder='Password' />
                <button className="loginButton" type="submit">Login</button>
                {/*<span className='registerLink'>Dont have account? </span>*/}
                {/*<Link to='/register'><span className='registerLink2'>REGISTER </span></Link>*/}
                <p>Usernames: phantomUser, ernad</p>
                <p>Passwords: phantomPass, ernad</p>
            </form>
          {errorMessage && <Alert variant="filled" severity="error">{errorMessage}</Alert>  }
        </div>
    </div>
  )
}

export default LoginPage