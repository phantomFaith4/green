import React from 'react'
import './notificationSlotComponent.css';

const NotificationSlotComponent = () => {
  return (
    <div className='notificationSlotComponent'>
        <div className='notificationSlotContainer'>
          <div className='notificationMessageDiv'>
            <span>This is notification temperature up</span>
          </div>
          <div className='notificationInfoDiv'>
            <span>Location</span>
            <span>Date time</span>
          </div>
        </div>
    </div>
  )
}

export default NotificationSlotComponent