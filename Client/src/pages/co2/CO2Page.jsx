import React from 'react'
import SidebarComponent from '../../components/sidebar/SidebarComponent'
import TopbarComponent from '../../components/topbar/TopbarComponent'

const CO2Page = () => {
  return (
    <div className='accountPage'>
        <TopbarComponent />
        <SidebarComponent />
        <div className="accountPageContainer">
            <h1>Test co2Page</h1>
        </div>
    </div>
  )
}

export default CO2Page