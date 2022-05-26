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

const HomePage = () => {

  const [location, setLocation] = useState('');
  const [defaultLocation,setDefaultLocation] = useState('');

  const getName = async (location) =>{
    setLocation(location);
    console.log("Home=>",location);
  } 
  useEffect(()=>{
    const userId = JSON.parse(localStorage.getItem('user'))._id ;
    const getFirstGreenhouse = async ()=>{
      const res = await axios.get(`/api/user/${userId}`)
      const res2 = await axios.get(`/api/greenhouse/${res.data.list[0]}`);
      setDefaultLocation(res2.data.greenhouse);
    };
    getFirstGreenhouse();
  },[]);
return (
    <div className='homePage'>
        <TopbarComponent getData={getName} />
        <Sidebar />
        <div className="homePageContainer">
            <TemperatureComponent loc={[location,defaultLocation]} />
            <WaterComponent />
            <NotificationComponent />
            <HumidityComponent />
            <LightComponent />
            <CO2Component />
        </div>
    </div>
  )
}

export default HomePage