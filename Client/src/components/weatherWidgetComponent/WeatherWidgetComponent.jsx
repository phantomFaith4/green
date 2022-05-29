import React from 'react'
import './weatherWidgetComponent.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const WeatherWidgetComponent = ({loc}) => {

  const [dateTime,setDateTime] = useState({
    date:'',
    time:'',
    });

    const getDateTime = ()=>{
      const today = new Date();
      const date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
      const time = today.getHours() + ":" + today.getMinutes();
      setDateTime({date:date,time:time});
    }
    const [weather,setWeather] = useState({});
    useEffect(()=>{
      console.log("Lokacija=>",loc);
      getDateTime();
      const fetch = async ()=>{
        try{
          const res = await axios.get(`/api/weather/${loc}`);
          setWeather(res.data);
          console.log("weatherData=>",res.data);
        }catch(err){
          console.log("ErrorFetchingWeatherData",err);
        }
      };
      fetch();
    },[loc]);

  return (
    <div className='weatherWidgetCompoent'>
        <div className='leftWeatherDiv'>
          <span>{weather.main ? Math.round(weather.main.temp) : 'NaN'} C°</span>
        </div>
        <div className='rightWeatherDiv'>
          <span><i class="timeIcon fa-solid fa-clock"></i> {dateTime.date} {dateTime.time}</span>
          <span><i className="locationIcon fa-solid fa-location-dot"></i>{loc}</span>
          <span> <i className="humidityIcon fa-solid fa-droplet"></i>{weather.main ? weather.main.humidity : 'NaN'}%</span>
        </div>
    </div>
  )
}

export default WeatherWidgetComponent