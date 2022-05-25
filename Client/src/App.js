import React from "react";
import HomePage from "./pages/home/HomePage";
import LoginPage from './pages/login/LoginPage';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import AccountPage from "./pages/account/AccountPage";
import NotificationPage from "./pages/notification/NotificationPage";
import TemperaturePage from "./pages/temperature/TemperaturePage";
import IrrigationPage from './pages/irrigation/IrrigationPage';
import LightPage from "./pages/light/LightPage";
import CO2Page from "./pages/co2/CO2Page";
import HumidityPage from './pages/humidity/HumidityPage';

function App() {
  return ( 
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/account' element={<AccountPage />} />
          <Route path='/notification' element={<NotificationPage />} />
          <Route path='/temperature' element={<TemperaturePage />} />
          <Route path='/irrigation' element={<IrrigationPage />} />
          <Route path='/light' element={<LightPage />} />
          <Route path='/co2' element={<CO2Page />} />
          <Route path='/humidity' element={<HumidityPage />} />
        </Routes>
      </BrowserRouter>
    </div> 
  );
}

export default App;
