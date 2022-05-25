import React from 'react'
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';

const HumidityComponent = () => {
  return (
    <div className='widgetComponent'>
        <div className="widgetComponentContainer">
            <div className='componentTitleDiv'>
              <span>HUMIDITY</span>
            </div>
            <div className='componentOperationsDiv'>
              <div className='widgetComponentSliderHolderDiv'>
                <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
              </div>
              <div className='widgetComponentButtonHolderDiv'>
                <Button variant="contained">AUTO</Button>
              </div>
            </div>
            <div className='componentDataDiv'>
              <span className='widgetComponetDataValueSpan'>{'33'} °C</span>
            </div>
        </div>
    </div>
  )
}

export default HumidityComponent