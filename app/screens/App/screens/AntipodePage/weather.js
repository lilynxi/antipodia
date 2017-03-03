/* eslint-disable */

import React, { Component } from 'react';


class Weather extends Component {

  render() {
    if(this.props.weather){
      var tempCeil = Math.ceil(this.props.weather.temp);
    }

    return (
      <div>
        { this.props.weather &&
          <span>{tempCeil}°C / {this.props.weather.desc}</span>
        }
      </div>
    )
  }
}


export default Weather;
