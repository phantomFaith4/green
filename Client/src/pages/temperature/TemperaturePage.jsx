import React from 'react'
import SidebarComponent from '../../components/sidebar/SidebarComponent'
import TopbarComponent from '../../components/topbar/TopbarComponent'
import WeatherWidgetComponent from '../../components/weatherWidgetComponent/WeatherWidgetComponent';
import './temperaturePage.css';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import { useEffect,useState } from 'react';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import TimeKeeper from 'react-timekeeper';
import DatePicker from 'sassy-datepicker';
import * as notificationOperation from '../../components/functionsFolder/pushNewNotifications';
import { Link } from 'react-router-dom';

const TemperaturePage = () => {

  const [dateTime, setDateTime] = useState('2022-May-21');
  const [time, setTime] = useState('12:34pm'); 
  const [errorMessage, setErrorMessage] = useState('');
  const [location, setLocation] = useState('');
  const [index, setIndex] = useState(0);
  const [greenhouse,setGreenhouse] = useState([]);
  const [counter,setCounter] = useState(0);
  const [value,setValue] = useState(0)
  const [auto,setAuto] = useState(false);
  const [upDate ,setUpDate] = useState(false);

  const getName = async (location,index) =>{
    setLocation(location);
    setIndex(index)
  }

  const updateTemperatureFromPage = async ()=>{
    try{
      const res = await axios.put(`/api/greenhouse/temp/${greenhouse[index]._id}`,{
        temp:value,
        auto:auto,
        time:time,
        date:dateTime, 
      });
      setCounter(counter+1);
      setErrorMessage(`Temperature changes saved`);
      setTimeout(()=> {
        setErrorMessage()
      }, 3000);
      notificationOperation.newNotification(`Temperature changed to: ${value} °C. Automatic mode is ${auto ? 'ON' : 'OFF'}`, greenhouse[index].greenhouse, greenhouse[index]._id);
    }catch(err){
      console.log("ErrorUpdatingTempFromPage",err);
    }
  } 
  const handleChange = (event, newValue)=>{setValue(newValue);};
  const handleButton = ()=>{auto ? setAuto(false) : setAuto(true);}
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
        setValue(res.data[index].temperature.temp);
        setAuto(res.data[index].temperature.auto);
        setTime(res.data[index].temperature.time);
        setDateTime(res.data[index].temperature.date ? res.data[index].temperature.date : '2022-May-21' );
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
                    <span>TEMPERATURE OPERATIONS</span>
                  </div>
                  <div className='temperaturePageSliderDiv'>
                    <Slider onChange={handleChange} value={value} min={10} max={45} aria-label="Default" valueLabelDisplay="auto" />
                  </div>
                  <div className='temperaturePageButtonDiv'>
                    <Button onClick={handleButton} variant="contained">AUTO {auto ? 'TRUE' : 'FALSE'}</Button>
                  </div>
                  <div className='temperaturePageDataDiv'>
                    <span className='temperaturePageDataSpan1'>Temperature inside greenhouse</span>
                    <span className='temperaturePageDataSpan2'>{value} C°</span>
                  </div>
                  <div className='temperaturePageSaveButtonDiv'>
                    <Button onClick={updateTemperatureFromPage} variant="contained">SAVE</Button>
                  </div>
                  {errorMessage && <Alert variant="filled" severity="success">{errorMessage}</Alert>  }
                </div>
              </div>
              <div className='leftDownDiv temperaturePageLeftDown'>
                <WeatherWidgetComponent loc={greenhouse[index] ? greenhouse[index].location : 'Sarajevo'}/>
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

export default TemperaturePage