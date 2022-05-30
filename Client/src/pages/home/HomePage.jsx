import React from 'react';
import './homePage.css';
import TopbarComponent from '../../components/topbar/TopbarComponent';
import Sidebar from '../../components/sidebar/SidebarComponent';
import TemperatureComponent from '../../components/temperatureComponent/TemperatureComponent';
import WaterComponent from '../../components/waterComponent/WaterComponent';
import LightComponent from '../../components/lightComponent/LightComponent';
import CO2Component from '../../components/co2Component/CO2Component';
import HumidityComponent from '../../components/humidityComponent/HumidityComponent';
import NotificationComponent from '../../components/notificationComponent/NotificationComponent';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const HomePage = () => {

  const [location, setLocation] = useState('');
  const [defaultLocation,setDefaultLocation] = useState('');
  const [index,setIndex] = useState(0);
  const getName = async (location,index) =>{
    setLocation(location);
    setIndex(index);
  } 
  useEffect(()=>{
    const getFirstGreenhouse = async ()=>{
      if(JSON.parse(localStorage.getItem('user')) !== null){
        const userId = JSON.parse(localStorage.getItem('user'))._id ;
        const res = await axios.get(`/api/user/${userId}`)
        const res2 = await axios.get(`/api/greenhouse/${res.data.list[0]}`);
        setDefaultLocation(res2.data.greenhouse);
      }
    };
    getFirstGreenhouse();
  },[]);
  
return (
    <div className='homePage'>
      {JSON.parse(localStorage.getItem('user')) === null ? 
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
        <Sidebar />
        <div className="homePageContainer">
            <TemperatureComponent loc={[location,defaultLocation]} />
            <WaterComponent loc={[location,defaultLocation]}/>
            <NotificationComponent index={index}/>
            <HumidityComponent loc={[location,defaultLocation]}/>
            <LightComponent loc={[location,defaultLocation]}/>
            <CO2Component loc={[location,defaultLocation]}/>
        </div>   
          </>
        )
      }
    </div>
  )
}

export default HomePage