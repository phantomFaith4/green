import React from 'react'
import './loadingComponent.css';
const LoadingComponent = () => {
  return (
    <div className='loadingComponent'>
        <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
  )
}

export default LoadingComponent