import React from 'react'
import './notificationPageSlot.css';

const NotificationPageSlot = () => {
  return (
    <div className='notificationPageSlot'>
        <div className='notificationPageSlotMessageDiv'>
            <span>Lorem ipsum dolor sit amet consectetur 
                adipisicing elit. Fugit vero quas neque 
                quo hic quaerat facere laudantium provident
                 velit, iusto consequuntur, ab et dolor 
                 perferendis quod magni! Ut, architecto qui?
            </span>
        </div>
        <div className='notificationPageSlotInfoDiv'>
            <span>Location</span>
            <span>DateTime</span>
        </div>
    </div>
  )
}

export default NotificationPageSlot