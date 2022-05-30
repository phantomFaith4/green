import React from 'react'
import SidebarComponent from '../../components/sidebar/SidebarComponent'
import TopbarComponent from '../../components/topbar/TopbarComponent'
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import Switch from '@mui/material/Switch';
import { useEffect, useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import './irrigationPage.css';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import TimeKeeper from 'react-timekeeper';
import DatePicker from 'sassy-datepicker';
import * as notificationOperation from '../../components/functionsFolder/pushNewNotifications';
import { Link } from 'react-router-dom';

const IrrigationPage = () => {
 
  const [dateTime, setDateTime] = useState('2022-May-21');
  const [time, setTime] = useState('12:34pm'); 
  const [errorMessage, setErrorMessage] = useState('');
  const [location, setLocation] = useState('');
  const [index, setIndex] = useState(0);
  const [checked, setChecked] = useState(false);
  const [greenhouse,setGreenhouse] = useState([]);
  const [counter,setCounter] = useState(0);
  const [value,setValue] = useState(0)
  const [auto,setAuto] = useState(false);
  const [watering,setWatering] = useState(false);
  const [upDate ,setUpDate] = useState(false);

  const getName = async (location,index) =>{
    setLocation(location);
    setIndex(index)
  }
  const handleChangeSwitch = () => {
    if(checked === false){
      setChecked(true);
    }else{
      setChecked(false);
    }
  };
  const updateIrrigationFromPage = async ()=>{
    try{
      const res = await axios.put(`/api/greenhouse/irrigation/${greenhouse[index]._id}`,{
        percentage: 25,
        amount:value,
        watering:watering,
        auto:auto,
        time:time,
        date:dateTime,
        fertilizer:checked,
      });
      setCounter(counter+1);
      setErrorMessage(`Irrigation changes saved`);
      setTimeout(()=> {
        setErrorMessage()
      }, 3000);
      notificationOperation.newNotification(`Soil moisture is at ${25}%. 
      Amount of water going in greenhouse is ${value} ml/s
      fertilizer is ${checked ? 'included' : 'not included'}. Irrigation is ${watering ? 'ON' : 'OFF'}.
       Automatic mode is ${auto ? 'ON' : 'OFF'}`, greenhouse[index].greenhouse, greenhouse[index]._id);
    }catch(err){
      console.log("updateIrrigatonFromPageErr",err);
    }
  };
  const handleChange = (event, newValue)=>{setValue(newValue);};
  const handleButton = ()=>{auto ? setAuto(false) : setAuto(true);}
  const handleButton2 = ()=>{watering ? setWatering(false) : setWatering(true);}
  const onChangeDate = (date) => {
    const testDate = date.toString();
    const arr = testDate.split(' ')
    setDateTime(`${arr[3]}-${arr[1]}-${arr[2]}`);
  };
  useEffect(()=>{
    const fetch = async ()=>{
      if(JSON.parse(localStorage.getItem('user')) !== null){
        await axios.get(`/api/greenhouse/all/${JSON.parse(localStorage.getItem('user'))._id}`).then(function (res) {
          setGreenhouse(res.data);  
          setValue(res.data[index].water.amount);
          setAuto(res.data[index].water.auto);
          setWatering(res.data[index].water.watering);
          setChecked(res.data[index].water.fertilizer);
          setTime(res.data[index].water.time);
          setDateTime(res.data[index].water.date ? res.data[index].water.date : '2022-May-21')
          setUpDate(false);
          setTimeout(()=> {
            setUpDate(true); 
          }, 100);
        }).catch(function (err) {
          console.log("TempWidgetFetchingError",err);
        })
      };  
    }
  fetch();
  },[counter]);
  return (
    <div className='accountPage'>
      {
        JSON.parse(localStorage.getItem('user')) === null ? 
        (
          <>
          <p>RESTRICTED ACCESS</p>
          <Link to='/login'>LOGIN</Link>
        </>
        )
        :
        (
          <>
             <TopbarComponent getData={getName}/>
        <SidebarComponent />
        <div className="accountPageContainer">
            <div className='leftPartPage'>
              <div className='leftUpDiv'>
              <div className='temperaturePageOperationsDiv'>
                  <div className='temperaturePageWidgetTitle'>
                    <span>IRRIGATION OPERATIONS</span>
                  </div>
                  <div className='waterSlider temperaturePageSliderDiv'>
                    <Slider onChange={handleChange} value={value} min={10} max={200} aria-label="Default" valueLabelDisplay="auto" />
                    <FormControlLabel  value="start" control={<Switch checked={checked} onClick={handleChangeSwitch} color="primary" />} label="Fertilizer" labelPlacement="start" />
                  </div>
                  <div className='temperaturePageButtonDiv'>
                    <Button onClick={handleButton2} variant="contained">WATERING {watering ? 'TRUE' : 'FALSE'}</Button>
                    <Button onClick={handleButton} variant="contained">AUTO {auto ? 'TRUE' : 'FALSE'}</Button>
                  </div>
                  <div className='waterData temperaturePageDataDiv'>
                    <span className='temperaturePageDataSpan1'>Soil moisture percentage inside greenhouse</span>
                    <span className='temperaturePageDataSpan2'>{greenhouse[index] ? greenhouse[index].water.percentage : 'NaN' } %</span>
                    <span className='temperaturePageDataSpan1'>and amount of water going through pipes</span>
                    <span className='temperaturePageDataSpan2'>{value} ml/s</span>
                  </div>
                  <div className='temperaturePageSaveButtonDiv'>
                    <Button onClick={updateIrrigationFromPage} variant="contained">SAVE</Button>
                  </div>
                  {errorMessage && <Alert variant="filled" severity="success">{errorMessage}</Alert>  }
                </div>
              </div>
              <div className='leftDownDiv'>
              </div>
            </div>
            <div className='rightPartPage'>
              <div className='rightUpPart'>
                <div className='timeKeeperDiv'>
                  <TimeKeeper hour24Mode={true} switchToMinuteOnHourSelect={true} time={time} onChange={(newTime) => setTime(newTime.formatted12)} />
                </div> 
              </div>
              <div className='rightDownPart'>
                <div className='datePickerDiv'>
                  {upDate && <DatePicker selected={new Date(dateTime)} onChange={onChangeDate} />}
                </div>
              </div>
            </div>
        </div>
          </>
        )
      }
    </div>
  )
}

export default IrrigationPage