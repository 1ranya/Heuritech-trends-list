import './App.css';
import React, { useState } from 'react'
import Navbar from './View/Navbar'
import Content from './View/Content'
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  
  const [sortValue, setSort] = useState()
  const [geoZone, setZone] = useState()
  const [gender, setGender] = useState()
  const [trendsDisplayMode, setTrendsDisplayMode] = useState()

  const setSortBindingFunc = (filter) => {
    setSort(filter)
  }
  const setModeBindingFunc = (mode) => {
    setTrendsDisplayMode(mode)
  }
  const setGenderBindingFunc = (gender) => {
    setGender(gender)
  }
  const setZoneBindingFunc = (zone) => {
    setZone(zone)
  }

  return (
    <div className="App">
      <Navbar 
        setSortBindingFunc={setSortBindingFunc} 
        setModeBindingFunc={setModeBindingFunc}
        setGenderBindingFunc={setGenderBindingFunc}
        setZoneBindingFunc={setZoneBindingFunc}
      />
      <Content 
        sortValue={sortValue} 
        trendsDisplayMode={trendsDisplayMode}
        gender={gender}
        geoZone={geoZone}
      />
    </div>
  );
}

export default App;
