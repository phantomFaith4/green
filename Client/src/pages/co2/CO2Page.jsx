import React from 'react'
import './CO2Page.css';
import SidebarComponent from '../../components/sidebar/SidebarComponent'
import TopbarComponent from '../../components/topbar/TopbarComponent'
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useEffect, useState } from 'react';
import FanComponent from '../../components/FanComponent/FanComponent';
import axios from 'axios';
import Alert from '@mui/material/Alert';

const CO2Page = () => {

  const [errorMessage, setErrorMessage] = useState('');
  const [location, setLocation] = useState('');
  const [index, setIndex] = useState(0);
  const [greenhouse,setGreenhouse] = useState([]);
  const [counter,setCounter] = useState(0);
  const [value,setValue] = useState(0)
  const [auto,setAuto] = useState(false);
  const [fan1, setFan1] = useState(false);
  const [fan2, setFan2] = useState(false);
  
  const getName = async (location,index) =>{
    setLocation(location);
    setIndex(index);
  }
  const handleChangeFan1 = () => {
    if(fan1 === false){
      setFan1(true);
    }else{
      setFan1(false);
    }
  };
  const handleChangeFan2 = () => {
    if(fan2 === false){
      setFan2(true);
    }else{
      setFan2(false);
    }
  };
  const updateCO2FromPage = async ()=>{
    try{
      const res = await axios.put(`/api/greenhouse/co2/${greenhouse[index]._id}`,{
        fan1:fan1,
        fan2:fan2,
        speed:value,
        auto:auto,
        time:'',
        date:'',
      });
      setErrorMessage(`CO2 changes saved`);
      setTimeout(()=> {
        setErrorMessage()
      }, 3000);
    }catch(err){
      console.log("UpdateCO2FromPageError",err);
    }
  };
  useEffect(()=>{
    const fetch = async ()=>{
      await axios.get(`/api/greenhouse/all/${JSON.parse(localStorage.getItem('user'))._id}`).then(function (res) {
        console.log(res.data);
        setGreenhouse(res.data);
        setValue(res.data[index].co2.speed);
        setFan1(res.data[index].co2.fan1);
        setFan2(res.data[index].co2.fan2);
        setAuto(res.data[index].co2.auto);
       }).catch(function (err) {
         console.log("TempWidgetFetchingError",err);
       })
     };  
  fetch();
  },[counter]);
  const handleButton = ()=>{ auto ? setAuto(false) : setAuto(true);}
  const handleChange = (event, newValue)=>{setValue(newValue);};
  return (
    <div className='accountPage'>
        <TopbarComponent getData={getName} />
        <SidebarComponent />
        <div className="accountPageContainer">
        <div className='leftPartPage'>
              <div className='leftUpDiv'>
                <div className='temperaturePageOperationsDiv'>
                  <div className='temperaturePageWidgetTitle'>
                    <span>CO2 OPERATIONS</span>
                  </div>
                  <div className='temperaturePageSliderDiv'>
                    <Slider value={value} onChange={handleChange} min={20} max={200} aria-label="Default" valueLabelDisplay="auto" />
                  </div>
                  <div className='co2PageFanSwitch'>
                  <FormControlLabel  value="start" control={<Switch onClick={handleChangeFan1} checked={fan1} color="primary" />} label="Fan #1" labelPlacement="start" />
                  <FormControlLabel  value="start" control={<Switch onClick={handleChangeFan2} checked={fan2} color="primary" />} label="Fan #2" labelPlacement="start" />
                  </div>
                  <div className='temperaturePageButtonDiv'>
                    <Button onClick={handleButton} variant="contained">AUTO {auto ? 'TRUE' : 'FALSE'}</Button>
                  </div>
                  <div className='temperaturePageDataDiv'>
                    <span className='temperaturePageDataSpan1'>Fan speed inside greenhouse</span>
                    <span className='temperaturePageDataSpan2'>{value} RPM</span>
                  </div>
                  <div className='temperaturePageSaveButtonDiv'>
                    <Button onClick={updateCO2FromPage} variant="contained">SAVE</Button>
                  </div>
                  {errorMessage && <Alert variant="filled" severity="success">{errorMessage}</Alert>  }
                </div>
              </div>
              <div className='leftDownDiv co2PageLeftDown'>
                <div className='fanHolder'>
                  <FanComponent spin={fan1} />
                  <FanComponent spin={fan2}/>
                </div>
              </div>
            </div>
            <div className='rightPartPage'>
              <h1>Right</h1>
              
            </div>
        </div>
    </div>
  )
}

export default CO2Page