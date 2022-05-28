import React from 'react'
import Button from '@mui/material/Button';
import { useEffect,useState } from 'react';
import axios from 'axios';


const CO2Component = ({loc}) => {

  const [greenhouse,setGreenhouse] = useState();
  const [counter,setCounter] = useState(0);
  const [CO2,setCO2] = useState({
    fan1:false,
    fan2:false,
    run:false,
    auto:false,
  });
  const updateCO2WidgetRun = async ()=>{
    try{
      const res = await axios.put(`/api/greenhouse/co2/${greenhouse._id}`,{
        run: !CO2.run,
        fan1: !CO2.fan1, 
        fan2: !CO2.fan2,
      });
      setCounter(counter+1);
    }catch(err){
      console.log("CO2WidgetUpdateErrorRun",err);
    }
  }
  const updateCO2WidgetAuto = async ()=>{
    try{
      const res = await axios.put(`/api/greenhouse/co2/${greenhouse._id}`,{
        auto:!CO2.auto,
      });
      setCounter(counter+1);
    }catch(err){
      console.log("CO2WidgetUpdateErrorAuto",err);
    }
  }
  useEffect(()=>{
    const fetch = async ()=>{
      await axios.get(`/api/greenhouse/name/${loc[0].length > 0  ? loc[0] : loc[1]}`).then(function (res) {
        setGreenhouse(res.data);
        setCO2(res.data.co2);
      }).catch(function (err) {
        console.log("CO2WidgetFetchingError",err);
      })
    };
    fetch();
  },[loc,counter]);

  return (
    <div>
        <div className='widgetComponent'>
        <div className="widgetComponentContainer">
            <div className='componentTitleDiv'>
              <span>CO2</span>
            </div>
            <div className='componentOperationsDiv'>
              <div className='widgetComponentButtonHolderDiv'>
                <Button onClick={updateCO2WidgetRun} variant="contained">RUN {CO2.run ? 'TRUE' : 'FALSE'}</Button>
                <Button onClick={updateCO2WidgetAuto} variant="contained">AUTO {CO2.auto ? 'TRUE' : 'FALSE'}</Button>
              </div>
            </div>
            <div className='componentDataDiv'>
              <span className='widgetComponetDataValueSpan'>{'600'} PPM</span>
            </div>
        </div>
    </div>
    </div>
  )
}

export default CO2Component