import React from 'react'
import Button from '@mui/material/Button';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Alert from '@mui/material/Alert';

const LightComponent = ({loc}) => {

  const [errorMessage, setErrorMessage] = useState('');
  const [greenhouse,setGreenhouse] = useState();
  const [counter,setCounter] = useState(0);
  const [light, setLight] = useState({
    intensity:'NaN',
    run:false,
    auto:false,
  });
  const updateLightFromWidgetRun = async ()=>{
    try{
      const res = await axios.put(`/api/greenhouse/light/${greenhouse._id}`,{
        run:!light.run,
      })
      setCounter(counter+1);
      setErrorMessage(`Lighting switched to: ${!light.run ? 'ON' : 'OFF'}`);
      setTimeout(()=> {
        setErrorMessage()
      }, 3000);
    }catch(err){
      console.log("LightWidgetUpdateRun",err);
    }
  };
  const updateLightFromWidgetAuto = async ()=>{
    try{
      const res = await axios.put(`/api/greenhouse/light/${greenhouse._id}`,{
        auto:!light.auto,
      })
      setCounter(counter+1);
      setErrorMessage(`Automatic lighting regulation switched to: ${!light.auto ? 'ON' : 'OFF'}`);
      setTimeout(()=> {
        setErrorMessage()
      }, 3000);
    }catch(err){
      console.log("LightWidgetUpdateRun",err);
    }
  };
  useEffect(()=>{
    const fetch = async ()=>{
      await axios.get(`/api/greenhouse/name/${loc[0].length > 0  ? loc[0] : loc[1]}`).then(function (res) {
        setGreenhouse(res.data);
        setLight(res.data.light);
      }).catch(function (err) {
        console.log("LightWidgetFetchingError",err);
      })
    };
    fetch();
  },[loc,counter]);

  return (
    <div className='widgetComponent'>
        <div className="widgetComponentContainer">
            <div className='componentTitleDiv'>
              <span>LIGHTS</span>
            </div>
            <div className='componentOperationsDiv'>
              <div className='widgetComponentButtonHolderDiv'>
                <Button onClick={updateLightFromWidgetRun} variant="contained">TURN {light.run ? 'TRUE' : 'FALSE'}</Button>
                <Button onClick={updateLightFromWidgetAuto} variant="contained">AUTO {light.auto ? 'TRUE' : 'FALSE'}</Button>
              </div>
            </div>
            <div className='componentDataDiv'>
              <span className='widgetComponetDataValueSpan'>{light.intensity} %</span>
            </div>
        </div>
        {errorMessage && <Alert variant="filled" severity="success">{errorMessage}</Alert>  }
    </div>
  )
}

export default LightComponent