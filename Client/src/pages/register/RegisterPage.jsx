import React from 'react';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  return (
    <div className='login'>
        <div className='loginFormDiv'>
            <span className='formTitle'>Register to Smart Greenhouse</span>
            <form className='loginForm'>
                <input className='inputEmail' type='text' placeholder='Username' />
                <input className='inputEmail' type='text' placeholder='Email' />
                <input className='inputPassword' type='password' placeholder='Password' />
                <button className="loginButton" type="submit">Register</button>
                <span className='registerLink'>Alredy have account? </span>
                <Link to='/login'><span className='registerLink2'>LOGIN</span></Link>
            </form>
        </div>
    </div>
  )
}

export default RegisterPage