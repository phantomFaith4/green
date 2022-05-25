import React from 'react'
import SidebarComponent from '../../components/sidebar/SidebarComponent'
import TopbarComponent from '../../components/topbar/TopbarComponent'

const LightPage = () => {
  return (
    <div className='accountPage'>
        <TopbarComponent />
        <SidebarComponent />
        <div className="accountPageContainer">
            <h1>Test LightPage</h1> 
        </div>
    </div>
  )
} 

export default LightPage