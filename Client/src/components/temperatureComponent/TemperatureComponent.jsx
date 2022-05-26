import React from 'react'
import './temperatureComponent.css';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import { useState, useEffect } from 'react';
import axios from 'axios';

const TemperatureComponent = ({loc}) => {
  
  useEffect(()=>{
    const fetch = async ()=>{
      try{
        const res = await axios.get(`/api/greenhouse/name/${loc[0].length > 0  ? loc[0] : loc[1]}`);
        console.log("From Temperature with love=>",res.data);
      }catch(err){
        console.log("errorGetingDataFromTemperatureWidget=>",err);
      };
    };  
    fetch();
  },[loc]);

  return (
    <div className='widgetComponent'>
        <div className="widgetComponentContainer">
            <div className='componentTitleDiv'>
              <span>TEMPERATURE</span>
            </div>
            <div className='componentOperationsDiv'>
              <div className='widgetComponentSliderHolderDiv'>
                <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
              </div>
              <div className='widgetComponentButtonHolderDiv'>
                <Button variant="contained">AUTO</Button>
              </div>
            </div>
            <div className='componentDataDiv'>
              <span className='widgetComponetDataValueSpan'>{'33'} °C</span>
            </div>
        </div>
    </div>
  )
}

export default TemperatureComponent