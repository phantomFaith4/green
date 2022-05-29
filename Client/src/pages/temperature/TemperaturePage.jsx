import React from 'react'
import SidebarComponent from '../../components/sidebar/SidebarComponent'
import TopbarComponent from '../../components/topbar/TopbarComponent'
import WeatherWidgetComponent from '../../components/weatherWidgetComponent/WeatherWidgetComponent';
import './temperaturePage.css';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import { useEffect,useState } from 'react';
import axios from 'axios';

const TemperaturePage = () => {

  const [location, setLocation] = useState('');
  const [index, setIndex] = useState(0);
  const getName = async (location,index) =>{
    setLocation(location);
    setIndex(index)
  }
  const [greenhouse,setGreenhouse] = useState([]);
  const [counter,setCounter] = useState(0);
  const [value,setValue] = useState(0)
  const [auto,setAuto] = useState(false);
  const updateTemperatureFromPage = async ()=>{
    try{
      const res = await axios.put(`/api/greenhouse/temp/${greenhouse[index]._id}`,{
        temp:value,
        auto:auto,
        time:'',
        date:'',
      });
      setCounter(counter+1);
    }catch(err){
      console.log("ErrorUpdatingTempFromPage",err);
    }
  } 
  const handleChange = (event, newValue)=>{setValue(newValue);};
  const handleButton = ()=>{auto ? setAuto(false) : setAuto(true);}
  useEffect(()=>{
    const fetch = async ()=>{
      await axios.get(`/api/greenhouse/all/${JSON.parse(localStorage.getItem('user'))._id}`).then(function (res) {
        console.log(res.data);
        setGreenhouse(res.data);
        setValue(res.data[index].temperature.temp);
        setAuto(res.data[index].temperature.auto)
        console.log("irrigationBoy=>",res.data);
       }).catch(function (err) {
         console.log("TempWidgetFetchingError",err);
       })
     };  
  fetch();
  },[counter]);
  return (
    <div className='accountPage'>
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
                </div>
              </div>
              <div className='leftDownDiv temperaturePageLeftDown'>
                <WeatherWidgetComponent loc={greenhouse[index] ? greenhouse[index].location : 'Sarajevo'}/>
              </div>
            </div>
            <div className='rightPartPage'>
              <h1>Right</h1>
              
            </div>
        </div>
    </div>
  )
}

export default TemperaturePage