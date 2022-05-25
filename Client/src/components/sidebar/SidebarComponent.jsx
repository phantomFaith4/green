import React from 'react'
import './sidebarComponent.css';
import {Link } from 'react-router-dom';

const SidebarComponent = () => {
  return (
    <div className='sidebarComponent'>
        <div className="sidebarContianer">
          <div className='sidebarPart1'>
            <i className="sidebarIcon fas fa-seedling"></i>
            <Link to='/' ><i className="sidebarIcon fas fa-home"></i></Link>
            <Link to='/account' ><i className="sidebarIcon fas fa-user"></i></Link>
            <Link to='/notification' ><i className="sidebarIcon fas fa-bell"></i></Link>
          </div>
          <div className='sidebarPart2'>
          <Link to='/irrigation' ><i className="sidebarIcon fas fa-faucet"></i></Link>
          <Link to='/temperature' ><i className="sidebarIcon fas fa-thermometer-half"></i></Link>
          <Link to='/light' ><i className="sidebarIcon fas fa-lightbulb"></i></Link>
          <Link to='/co2' ><i className="sidebarIcon fa-solid fa-gauge-high"></i></Link>
          <Link to='/humidity' ><i className="sidebarIcon fas fa-tint"></i></Link>
          </div>
          <div className='sidebarPart3'>
            <i className="sidebarIcon fas fa-sign-out-alt"></i>
          </div>
        </div>
    </div>
  )
}

export default SidebarComponent