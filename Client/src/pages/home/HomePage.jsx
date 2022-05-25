import React from 'react';
import TopbarComponent from '../../components/topbar/TopbarComponent';
import Sidebar from '../../components/sidebar/SidebarComponent';
import './homePage.css';

import TemperatureComponent from '../../components/temperatureComponent/TemperatureComponent';
import WaterComponent from '../../components/waterComponent/WaterComponent';
import LightComponent from '../../components/lightComponent/LightComponent';
import CO2Component from '../../components/co2Component/CO2Component';
import HumidityComponent from '../../components/humidityComponent/HumidityComponent';
import NotificationComponent from '../../components/notificationComponent/NotificationComponent';

const HomePage = () => {
  return (
    <div className='homePage'>
        <TopbarComponent />
        <Sidebar />
        <div className="homePageContainer">
            <TemperatureComponent />
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