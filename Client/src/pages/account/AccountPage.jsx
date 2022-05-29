import React from 'react'
import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TopbarComponent from '../../components/topbar/TopbarComponent';
import SidebarComponent from '../../components/sidebar/SidebarComponent';
import './accountPage.css';
import AccountSettingsComponent from '../../components/accountSettingsComponent/AccountSettingsComponent';
import GreenhouseSettingsComponent from '../../components/greenhouseSettingsComponent/GreenhouseSettingsComponent';

const AccountPage = () => {

  function TabPanel(props) {
    const { children, value, index, ...other } = props;  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(()=>{

  },[]);
  return (
    <div className='accountPage'>
        <TopbarComponent />
        <SidebarComponent />
        <div className="accPageContainer accountPageContainer ">
          <div className="accountComponents">
            <div className='tabHolder'>
              <div className='tabsButtonDiv'>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                  <Tab label="User settings"  />
                  <Tab label="Greenhouse settings" />
                  <Tab label="Notification settings"  />
                  <Tab label="Privacy settings" />
                </Tabs>
              </div>
              <div className='tabPanelsDiv'>
                <TabPanel value={value} index={0}>
                  <AccountSettingsComponent />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <GreenhouseSettingsComponent />
                </TabPanel>
                <TabPanel value={value} index={2}>
                  Item Three
                </TabPanel>
                <TabPanel value={value} index={3}>
                  Item Four
                </TabPanel>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default AccountPage