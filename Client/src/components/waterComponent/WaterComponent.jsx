import React from 'react'
import Button from '@mui/material/Button';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import LoadingComponent from '../../components/loadingComponent/LoadingComponent';
import * as notificationOperation from '../functionsFolder/pushNewNotifications';

const WaterComponent = ({loc}) => {

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
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
      setErrorMessage(`Irrigation system switched: ${!irrigation.watering ? 'ON' : 'OFF'}`);
      setTimeout(()=> {
        setErrorMessage()
      }, 3000);
      notificationOperation.newNotification(`Irrigation system switched: ${!irrigation.watering ? 'ON' : 'OFF'}`, greenhouse.greenhouse, greenhouse._id);
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
      setErrorMessage(`Automatic irrigation system switched: ${!irrigation.auto ? 'ON' : 'OFF'}`);
      setTimeout(()=> {
        setErrorMessage()
      }, 3000);
      notificationOperation.newNotification(`Automatic irrigation system switched: ${!irrigation.auto ? 'ON' : 'OFF'}`, greenhouse.greenhouse, greenhouse._id);
    }catch(err){
      console.log("ErrodUpdatingIrrigationFromWidget",err);
    }
  }
  useEffect(()=>{
    const fetch = async ()=>{
        const res = await axios.get(`/api/greenhouse/name/${loc[0].length > 0  ? loc[0] : loc[1]}`).then(function (res) {
          setGreenhouse(res.data);
          setIrrigation(res.data.water);
          setLoading(true);
        }).catch(function (err) {
          console.log("IrrigationWidgetFetchingError=>",err);
        })
    };
    fetch();
  },[loc,counter]);

  return (
    <div className='widgetComponent'>
      {
        loading ?
        (
          <>
          <div className="widgetComponentContainer">
            <div className='componentTitleDiv'>
              <span>IRRIGATION</span>
            </div>
            <div className='componentOperationsDiv'>
              <div className='widgetComponentButtonHolderDiv'>
                <Button onClick={updateIrrigationFromWidgetWatering} variant="contained">WATERING {irrigation.watering ? 'ON' : 'OFF'}</Button>
                <Button onClick={updateIrrigationFromWidgetAuto} variant="contained">AUTO {irrigation.auto ? 'ON' : 'OFF'}</Button>
              </div>
            </div>
            <div className='componentDataDiv'>
              <span className='widgetComponetDataValueSpan'>{irrigation.percentage ? irrigation.percentage + '%' : 'NOT_SET'} </span>
            </div>
        </div>
        {errorMessage && <Alert variant="filled" severity="success">{errorMessage}</Alert>  }
          </>
        )
        :
        (<div className='loadingComponentDiv'><LoadingComponent /></div>)
      }
    </div>
  )
}

export default WaterComponent