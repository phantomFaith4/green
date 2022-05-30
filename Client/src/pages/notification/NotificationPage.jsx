import React from 'react'
import SidebarComponent from '../../components/sidebar/SidebarComponent'
import TopbarComponent from '../../components/topbar/TopbarComponent'
import './notificationPage.css';
import NotificationPageSlot from './notificationPageSlot/NotificationPageSlot';
import axios from 'axios';
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';

const NotificationPage = () => {

  const [index, setIndex] = useState(0);
  const [location, setLocation] = useState('');
  
  const getName = async (location,index) =>{
    setLocation(location);
    setIndex(index)
  }
  const [notifications,setNotifications] = useState([]);

  useEffect(()=>{
    const fetch = async ()=>{
      try{
        if(JSON.parse(localStorage.getItem('user')) !== null){
          const userId = JSON.parse(localStorage.getItem('user'))._id;
          const res = await axios.get(`/api/notification/all/user/${userId}`);
          setNotifications(res.data);
        }
      }catch(err){
        console.log("ErrorFetching notifications");
      }
    };
    fetch();
  },[]);

  return (
    <div className='accountPage'>
      {
        JSON.parse(localStorage.getItem('user')) === null ?
        (
          <>
            <p>RESTRICTED ACCESS</p>
            <Link to='/login'>LOGIN</Link>
          </>
        )
        :
        (
          <>
          <TopbarComponent getData={getName} />
        <SidebarComponent />
        <div className="accountPageContainer2">
            <div className='notificationPageDiv'>
              <div className='notificationPageTitleDiv'>
                <span>NOTIFICATIONS</span>
              </div>
              <div className='notificationPageFilterDiv'>
               {/*  <span>Filter1</span>
                <span>Filter2</span>
                <span>Filter3</span>
                <span>Filter4</span> */}
              </div>
              <div className='notificationsDataDiv'>
                <ul className='notificationList'>
                {
                  notifications.map(n=>
                    (
                      <li className='notificationListItem'><NotificationPageSlot key={n._id} notification={n} /></li>
                    )
                    )
                }
                </ul>
              </div>
            </div>
        </div>
          </>
        )
      }
    </div>
  )
}

export default NotificationPage