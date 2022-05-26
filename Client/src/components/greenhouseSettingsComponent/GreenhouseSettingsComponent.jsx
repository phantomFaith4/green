import React from 'react'
import './greenhouseSettingComponent.css';

const GreenhouseSettingsComponent = () => {
  return (
    <div className='greenhouseSettingsComponent'>
        <div className='tableDiv'>
            <table className='greenhouseTable'>
                <tr>
                    <th>NAME</th>
                    <th>LOCATION</th>
                    <th>CONTENT</th>
                    <th>DESCRIPTION</th>
                    <th>SIZE</th>
                    <th>D</th>
                </tr>
                <tr>
                    <td>Alfreds Futterkiste</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                    <td>Germany</td>
                    <td>Germany</td>
                    <td><i class="fa-solid fa-trash"></i></td>
                </tr>
            </table>
        </div>
    </div>
  )
}

export default GreenhouseSettingsComponent