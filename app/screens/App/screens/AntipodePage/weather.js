/* eslint-disable */

import React, { Component } from 'react';

const Weather = ({ weather }) => {
  const tempCeil = weather && Math.ceil(weather.temp);

  return (
    <div>
      {weather && <span>{tempCeil}°C / {weather.desc}</span>}
    </div>
  );
}

export default Weather;
