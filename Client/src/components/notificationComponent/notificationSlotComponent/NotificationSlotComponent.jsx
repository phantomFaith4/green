import React from 'react'
import './notificationSlotComponent.css';

const NotificationSlotComponent = ({notification}) => {
  return (
    <div className='notificationSlotComponent'>
        <div className='notificationSlotContainer'>
          <div className='notificationMessageDiv'>
            <span>{notification.text}</span>
          </div>
          <div className='notificationInfoDiv'>
            <span>{notification.location}</span>
            <span>{new Date(notification.createdAt).toDateString()}, {new Date(notification.createdAt).getHours() + ':' +new Date(notification.createdAt).getMinutes() }</span>
          </div>
        </div>
    </div>
  )
}

export default NotificationSlotComponent