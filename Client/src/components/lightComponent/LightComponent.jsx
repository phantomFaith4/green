import React from 'react'
import Button from '@mui/material/Button';

const LightComponent = () => {
  return (
    <div className='widgetComponent'>
        <div className="widgetComponentContainer">
            <div className='componentTitleDiv'>
              <span>LIGHTS</span>
            </div>
            <div className='componentOperationsDiv'>
              <div className='widgetComponentButtonHolderDiv'>
                <Button variant="contained">AUTO</Button>
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

export default LightComponent