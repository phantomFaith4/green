import React from 'react'
import SidebarComponent from '../../components/sidebar/SidebarComponent'
import TopbarComponent from '../../components/topbar/TopbarComponent'
import './notificationPage.css';
import NotificationPageSlot from './notificationPageSlot/NotificationPageSlot';

const NotificationPage = () => {
  return (
    <div className='accountPage'>
        <TopbarComponent />
        <SidebarComponent />
        <div className="accountPageContainer">
            <div className='notificationPageDiv'>
              <div className='notificationPageTitleDiv'>
                <span>NOTIFICATIONS</span>
              </div>
              <div className='notificationPageFilterDiv'>
                <span>Filter1</span>
                <span>Filter2</span>
                <span>Filter3</span>
                <span>Filter4</span>
              </div>
              <div className='notificationsDataDiv'>
                <NotificationPageSlot />
                <NotificationPageSlot />
                <NotificationPageSlot />
                <NotificationPageSlot />
                <NotificationPageSlot />
                <NotificationPageSlot />
                <NotificationPageSlot />
                <NotificationPageSlot />
                <NotificationPageSlot />
                <NotificationPageSlot />
              </div>
            </div>
        </div>
    </div>
  )
}

export default NotificationPage