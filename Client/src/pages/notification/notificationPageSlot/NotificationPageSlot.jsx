import React from 'react'
import './notificationPageSlot.css';

const NotificationPageSlot = ({notification}) => {
  return (
    <div className='notificationPageSlot'>
        <div className='notificationPageSlotMessageDiv'>
            <span>{notification.text}</span>
        </div>
        <div className='notificationPageSlotInfoDiv'>
            <span>{notification.location}</span>
            <span>{new Date(notification.createdAt).toDateString()}, {new Date(notification.createdAt).getHours() + ':' +new Date(notification.createdAt).getMinutes() }</span>
        </div>
    </div>
  )
}

export default NotificationPageSlot