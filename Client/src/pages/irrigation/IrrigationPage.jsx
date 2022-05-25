import React from 'react'
import SidebarComponent from '../../components/sidebar/SidebarComponent'
import TopbarComponent from '../../components/topbar/TopbarComponent'

const IrrigationPage = () => {
  return (
    <div className='accountPage'>
        <TopbarComponent />
        <SidebarComponent />
        <div className="accountPageContainer">
            <h1>Test irrigatonPage</h1>
        </div>
    </div>
  )
}

export default IrrigationPage