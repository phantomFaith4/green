import React from 'react'
import SidebarComponent from '../../components/sidebar/SidebarComponent'
import TopbarComponent from '../../components/topbar/TopbarComponent'
import './accountPage.css';

const AccountPage = () => {
  return (
    <div className='accountPage'>
        <TopbarComponent />
        <SidebarComponent />
        <div className="accountPageContainer">
            <h1>Test accountPage</h1>
        </div>
    </div>
  )
}

export default AccountPage