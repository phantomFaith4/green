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

const IrrigationPage = () => {

  const [location, setLocation] = useState('');
  const [index, setIndex] = useState(0);
  const [checked, setChecked] = useState(false);
  const [greenhouse,setGreenhouse] = useState([]);
  const [counter,setCounter] = useState(0);
  const [value,setValue] = useState(0)
  const [auto,setAuto] = useState(false);
  const [watering,setWatering] = useState(false);
  
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
        percentage: 75,
        amount:value,
        watering:watering,
        auto:auto,
        fertilizer:checked,
        time:'',
        date:'',
      });
      setCounter(counter+1);
    }catch(err){
      console.log("updateIrrigatonFromPageErr",err);
    }
  };
  const handleChange = (event, newValue)=>{setValue(newValue);};
  const handleButton = ()=>{auto ? setAuto(false) : setAuto(true);}
  const handleButton2 = ()=>{watering ? setWatering(false) : setWatering(true);}
  useEffect(()=>{
    const fetch = async ()=>{
      await axios.get(`/api/greenhouse/all/${JSON.parse(localStorage.getItem('user'))._id}`).then(function (res) {
        console.log(res.data);
        setGreenhouse(res.data);  
        setValue(res.data[index].water.amount);
        setAuto(res.data[index].water.auto);
        setWatering(res.data[index].water.watering);
        setChecked(res.data[index].water.fertilizer);
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
                    <span className='temperaturePageDataSpan1'>Irrigation percentage inside greenhouse</span>
                    <span className='temperaturePageDataSpan2'>{greenhouse[index] ? greenhouse[index].water.percentage : 'NaN' } %</span>
                    <span className='temperaturePageDataSpan1'>and amount of water going through pipes</span>
                    <span className='temperaturePageDataSpan2'>{value} ml/s</span>
                  </div>
                  <div className='temperaturePageSaveButtonDiv'>
                    <Button onClick={updateIrrigationFromPage} variant="contained">SAVE</Button>
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

export default IrrigationPage