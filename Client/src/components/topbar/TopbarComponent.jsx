import React from 'react'
import './topbarComponent.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const TopbarComponent = (props) => {
  
  const [greenhouse, setGreenhouse] = useState([]);
  
  useEffect(()=>{
    const fetch = async ()=>{
      try{
        const res = await axios.get('/api/greenhouse/all');
        setGreenhouse(res.data);
      }catch(err){
        console.log("ErrorFetching=>",err); 
      };
    };
    fetch();
  },[]);
  return (
    <div className='topbarComponent'>
        <div className="topbarContainer">
          <select onChange={(e)=>props.getData(e.target.value)} className="custom-select">
            {
                greenhouse.map(g=>
                  g.owner === JSON.parse(localStorage.getItem('user'))._id && 
                (<option key={g._id}>{g.greenhouse}</option>) 
              )
            }
          </select>
        </div>
    </div>
  )
}

export default TopbarComponent