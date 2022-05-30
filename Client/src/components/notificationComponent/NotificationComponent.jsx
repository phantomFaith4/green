import React from 'react'
import './notificationComponent.css';
import NotificationSlotComponent from './notificationSlotComponent/NotificationSlotComponent';
import { useEffect,useState } from 'react';
import axios from 'axios';
import LoadingComponent from '../../components/loadingComponent/LoadingComponent';

const NotificationComponent = ({index}) => {

  const [loading, setLoading] = useState(false);
  const [notifications,setNotifications] = useState([]);
  useEffect(()=>{
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    const fetch = async ()=>{
      try{
        const res = await axios.get(`/api/greenhouse/all/${userId}`);
        try{
          const res2 = await axios.get(`/api/notification/all/${res.data[index]._id}`);
          setNotifications(res2.data);
          setLoading(true);
        }catch(err){
          console.log("Deep_NOTIFETCHERR2=>",err);
        }
      }catch(err){
        console.log("NOTIFETCHERR=>",err);
      }
     };  
  fetch();
  },[index,notifications]);

  return (
    <div className='widgetComponent'>
      {
        loading ? 
        (
          <>
              <div className="widgetComponentContainer">
            <div className='componentTitleDiv'>
              <span>NOTIFICATIONS</span>
            </div>
            <div className='componentNotificationsDiv'>
              <ul className='notificationList'>
              {
                notifications.map(n=>
                  (
                    <li className='notificationListItem'><NotificationSlotComponent key={n._id} notification={n}/></li>
                  )
                )
              }
              </ul>
            </div>
        </div>
          </>
        )
        :
        (<div className='loadingComponentDiv'><LoadingComponent /></div>)
      }
    </div>
  )
}

export default NotificationComponent