import React from 'react'
import Button from '@mui/material/Button';
import {useState, useEffect} from 'react';
import axios from 'axios';

const LightComponent = ({loc}) => {
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
    </div>
  )
}

export default LightComponent