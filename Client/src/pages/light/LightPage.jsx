import React from 'react'
import SidebarComponent from '../../components/sidebar/SidebarComponent'
import TopbarComponent from '../../components/topbar/TopbarComponent'
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import TimeKeeper from 'react-timekeeper';
import DatePicker from 'sassy-datepicker';
import * as notificationOperation from '../../components/functionsFolder/pushNewNotifications';
import { Link } from 'react-router-dom';

const LightPage = () => {

  const [dateTime, setDateTime] = useState(new Date());
  const [time, setTime] = useState('12:34pm'); 
  const [errorMessage, setErrorMessage] = useState('');
  const [location, setLocation] = useState('');
  const [index, setIndex] = useState(0);
  const [greenhouse,setGreenhouse] = useState([]);
  const [counter,setCounter] = useState(0);
  const [value,setValue] = useState(0)
  const [auto,setAuto] = useState(false);
  const [run,setRun] = useState(false);
  const [upDate ,setUpDate] = useState(false);

  const getName = async (location,index) =>{
    setLocation(location);
    setIndex(index)
  }
  const handleChange = (event, newValue)=>{setValue(newValue);};

  const updateLightFromPage = async ()=>{
    try{
      const res = await axios.put(`/api/greenhouse/light/${greenhouse[index]._id}`,{
        intensity:value,
        auto:auto,
        run:run,
        time:time,
        date:dateTime,
      });
      setCounter(counter+1);
      setErrorMessage(`Light changes saved`);
      setTimeout(()=> {
        setErrorMessage()
      }, 3000);
      notificationOperation.newNotification(`Light intensity changed to: ${value} %. Lights are ${run ? 'ON' : 'OFF'}. Automatic mode is ${auto ? 'ON' : 'OFF'}`, greenhouse[index].greenhouse, greenhouse[index]._id);
    }catch(err){
      console.log("UpdateLightFromPageError=>",err);
    }
  };
  const handleButton = ()=>{auto ? setAuto(false) : setAuto(true);}
  const handleButton2 = ()=>{run ? setRun(false) : setRun(true); }
  const onChangeDate = (date) => {
    const testDate = date.toString();
    const arr = testDate.split(' ')
    setDateTime(`${arr[3]}-${arr[1]}-${arr[2]}`);
  };
  useEffect(()=>{
    const fetch = async ()=>{
      if(JSON.parse(localStorage.getItem('user')) !== null){
        await axios.get(`/api/greenhouse/all/${JSON.parse(localStorage.getItem('user'))._id}`).then(function (res) {
          console.log(res.data);
        setGreenhouse(res.data);  
        setValue(res.data[index].light.intensity);
        setAuto(res.data[index].light.auto);
        setRun(res.data[index].light.run);
        setTime(res.data[index].light.time);
        setDateTime(res.data[index].light.date ? res.data[index].light.date : '2022-May-21');
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
          <TopbarComponent  getData={getName}/>
        <SidebarComponent />
        <div className="accountPageContainer">
        <div className='leftPartPage'>
              <div className='leftUpDiv'>
              <div className='temperaturePageOperationsDiv'>
                  <div className='temperaturePageWidgetTitle'>
                    <span>LIGHTING OPERATIONS</span>
                  </div>
                  <div className='waterSlider temperaturePageSliderDiv'>
                    <Slider onChange={handleChange} value={value} min={10} max={100} aria-label="Default" valueLabelDisplay="auto" />
                  </div>
                  <div className='temperaturePageButtonDiv'>
                    <Button onClick={handleButton2} variant="contained">LIGHT {run ? 'TRUE' : 'FALSE'}</Button>
                    <Button onClick={handleButton} variant="contained">AUTO {auto ? 'TRUE' : 'FALSE'}</Button>
                  </div>
                  <div className='waterData temperaturePageDataDiv'>
                    <span className='temperaturePageDataSpan1'>Lighting intensity inside greenhouse</span>
                    <span className='temperaturePageDataSpan2'>{value} %</span>
                  </div>
                  <div className='temperaturePageSaveButtonDiv'>
                    <Button onClick={updateLightFromPage} variant="contained">SAVE</Button>
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
                  <TimeKeeper className={'testTime'} hour24Mode={true} switchToMinuteOnHourSelect={true} time={time} onChange={(newTime) => setTime(newTime.formatted12)} />
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

export default LightPage