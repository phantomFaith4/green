import React from 'react'
import { Link } from 'react-router-dom';
import './errorPage.css';

const ErrorPage = () => {
  return (
    <div className='errorPage'>
      <div className='errorPageContainer'>
        <h1>Error 404</h1>
          <Link to='/'><h2>Return to HOME</h2></Link>
        <h1>Error 404</h1> 
      </div>
    </div>
  )
}

export default ErrorPage