import React from 'react'
import SidebarComponent from '../../components/sidebar/SidebarComponent'
import TopbarComponent from '../../components/topbar/TopbarComponent'

const IrrigationPage = () => {
  return (
    <div className='accountPage'>
        <TopbarComponent />
        <SidebarComponent />
        <div className="accountPageContainer">
            <div className='leftPartPage'>
              <div className='leftUpDiv'>
                <h1>Up</h1>
              </div>
              <div className='leftDownDiv'>
                <h1>Down</h1>
              </div>
            </div>
            <div className='rightPartPage'>
              <h1>Right</h1>
            </div>
        </div>
    </div>
  )
}

export default IrrigationPage