import React from 'react'
import SidebarComponent from '../../components/sidebar/SidebarComponent'
import TopbarComponent from '../../components/topbar/TopbarComponent'
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import { useEffect, useState } from 'react';
import axios from 'axios';

const LightPage = () => {

  const [location, setLocation] = useState('');
  const [index, setIndex] = useState(0);
  const [greenhouse,setGreenhouse] = useState([]);
  const [counter,setCounter] = useState(0);
  const [value,setValue] = useState(0)
  const [auto,setAuto] = useState(false);
  const [run,setRun] = useState(false);
  
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
        time:'',
        date:'',
      });
      setCounter(counter+1);
    }catch(err){
      console.log("UpdateLightFromPageError=>",err);
    }
  };
  const handleButton = ()=>{auto ? setAuto(false) : setAuto(true);}
  const handleButton2 = ()=>{run ? setRun(false) : setRun(true);}
  useEffect(()=>{
    const fetch = async ()=>{
      await axios.get(`/api/greenhouse/all/${JSON.parse(localStorage.getItem('user'))._id}`).then(function (res) {
        console.log(res.data);
        setGreenhouse(res.data);  
        setValue(res.data[index].light.intensity);
        setAuto(res.data[index].light.auto);
        setRun(res.data[index].light.run);
       }).catch(function (err) {
         console.log("TempWidgetFetchingError",err);
       })
     };  
  fetch();
  },[counter]);
  return (
    <div className='accountPage'>
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
                </div>
              </div>
              <div className='leftDownDiv'>
              </div>
            </div>
            <div className='rightPartPage'>
              <h1>Right</h1>
            </div>
        </div>
    </div>
  )
} 

export default LightPage