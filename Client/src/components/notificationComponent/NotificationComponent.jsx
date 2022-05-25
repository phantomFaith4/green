import React from 'react'
import './notificationComponent.css';
import NotificationSlotComponent from './notificationSlotComponent/NotificationSlotComponent';

const NotificationComponent = () => {
  return (
    <div className='widgetComponent'>
        <div className="widgetComponentContainer">
            <div className='componentTitleDiv'>
              <span>NOTIFICATIONS</span>
            </div>
            <div className='componentNotificationsDiv'>
                <NotificationSlotComponent />
                <NotificationSlotComponent />
                <NotificationSlotComponent />
                <NotificationSlotComponent />
            </div>
        </div>
    </div>
  )
}

export default NotificationComponent