/* eslint-disable */

import React, { Component } from 'react';
import Map from './map';


const marker = { lat: -25.363882, lng: 131.044922 };
const initialCenter = { lat: -25.363882, lng: 131.044922 };



const App = () => {
  return (
    <div>
      <Map marker={marker} initialCenter={initialCenter}/>
      
    </div>
  )
}



export default App;
