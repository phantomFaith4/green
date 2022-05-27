import React from 'react'
import './temperatureComponent.css';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import { useState, useEffect } from 'react';
import axios from 'axios';

const TemperatureComponent = ({loc}) => {
  
  const [temperature,setTemperature] = useState({
    temp:'NaN',
    auto:false,
  });
  const [value,setValue] = useState(0);
  const [greenhouse,setGreenhouse] = useState();
  const [counter,setCounter] = useState(0);

  const updateTemperatureFromWidget = async ()=>{
    try{
      const res = await axios.put(`/api/greenhouse/temp/${greenhouse._id}`,{
        temp:value,
      });
    }catch(err){
      console.log("ErrorUpdatingTemperatureFromWidget=>",err);
    }
    setCounter(counter+1);
  };
  const updateTemperatureFromWidget2 = async ()=>{
    try{
      const res = await axios.put(`/api/greenhouse/temp/${greenhouse._id}`,{
        auto:!temperature.auto,
      });
    }catch(err){
      console.log("ErrorOnClickButton=>",err);
    }
    setCounter(counter+1);
  };
  const handleChange = (event, newValue)=>{
    setValue(newValue);
  };
  useEffect(()=>{
    const fetch = async ()=>{
         await axios.get(`/api/greenhouse/name/${loc[0].length > 0  ? loc[0] : loc[1]}`).then(function (res) {
            setGreenhouse(res.data);
            setTemperature(res.data.temperature);
            setValue(res.data.temperature.temp);
          }).catch(function (err) {
            console.log("TempWidgetFetchingError",err);
          })
        };  
    fetch();
  },[loc,counter]);
  return (
    <div className='widgetComponent'>
        <div className="widgetComponentContainer">
            <div className='componentTitleDiv'>
              <span>TEMPERATURE</span>
            </div>
            <div className='componentOperationsDiv'>
              <div className='widgetComponentSliderHolderDiv'>
                <Slider value={value} onChange={handleChange} onMouseUp={updateTemperatureFromWidget}  min={10} max={45} aria-label="Default" valueLabelDisplay="auto" />
              </div>
              <div className='widgetComponentButtonHolderDiv'>
                <Button onClick={updateTemperatureFromWidget2} variant="contained">AUTO {temperature.auto ? 'TRUE' : 'FALSE'}</Button>
              </div>
            </div>
            <div className='componentDataDiv'>
              <span className='widgetComponetDataValueSpan'>{temperature.temp} °C</span>
            </div>
        </div>
    </div>
  )
}

export default TemperatureComponent