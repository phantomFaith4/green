import React from 'react'
import Button from '@mui/material/Button';

const CO2Component = () => {
  return (
    <div>
        <div className='widgetComponent'>
        <div className="widgetComponentContainer">
            <div className='componentTitleDiv'>
              <span>CO2</span>
            </div>
            <div className='componentOperationsDiv'>
              <div className='widgetComponentButtonHolderDiv'>
                <Button variant="contained">AUTO</Button>
                <Button variant="contained">AUTO</Button>
              </div>
            </div>
            <div className='componentDataDiv'>
              <span className='widgetComponetDataValueSpan'>{'33'} PPM</span>
            </div>
        </div>
    </div>
    </div>
  )
}

export default CO2Component