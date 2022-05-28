import React from 'react'
import Button from '@mui/material/Button';
import {useEffect, useState} from 'react';
import axios from 'axios';


const WaterComponent = ({loc}) => {
  const [greenhouse,setGreenhouse] = useState();
  const [irrigation,setIrrigation] = useState({
    percentage:'NaN',
    watering:false,
    auto:false,
  });
  const [counter,setCounter] = useState(0);

  const updateIrrigationFromWidgetWatering = async ()=>{
    try{
      const res = await axios.put(`/api/greenhouse/irrigation/${greenhouse._id}`,{
        watering:!irrigation.watering,
      });
      setCounter(counter+1);
    }catch(err){
      console.log("ErrodUpdatingIrrigationFromWidget",err);
    }
  }
  const updateIrrigationFromWidgetAuto = async ()=>{
    try{
      const res = await axios.put(`/api/greenhouse/irrigation/${greenhouse._id}`,{
        auto:!irrigation.auto,
      });
      setCounter(counter+1);
    }catch(err){
      console.log("ErrodUpdatingIrrigationFromWidget",err);
    }
  }
  useEffect(()=>{
    const fetch = async ()=>{
        const res = await axios.get(`/api/greenhouse/name/${loc[0].length > 0  ? loc[0] : loc[1]}`).then(function (res) {
          setGreenhouse(res.data);
          setIrrigation(res.data.water);
          console.log("IRRIGATION",res.data);
        }).catch(function (err) {
          console.log("IrrigationWidgetFetchingError=>",err);
        })
    };
    fetch();
  },[loc,counter]);

  return (
    <div className='widgetComponent'>
        <div className="widgetComponentContainer">
            <div className='componentTitleDiv'>
              <span>IRRIGATION</span>
            </div>
            <div className='componentOperationsDiv'>
              <div className='widgetComponentButtonHolderDiv'>
                <Button onClick={updateIrrigationFromWidgetWatering} variant="contained">WATERING {irrigation.watering ? 'TRUE' : 'FALSE'}</Button>
                <Button onClick={updateIrrigationFromWidgetAuto} variant="contained">AUTO {irrigation.auto ? 'TRUE' : 'FALSe'}</Button>
              </div>
            </div>
            <div className='componentDataDiv'>
              <span className='widgetComponetDataValueSpan'>{irrigation.percentage} %</span>
            </div>
        </div>
    </div>
  )
}

export default WaterComponent