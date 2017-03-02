/* eslint-disable */

import React, { Component } from 'react';
import App from './app';
import LocationInput from './locationInput';
import withScriptjs from "react-google-maps/lib/async/withScriptjs";




class mapWrapper extends Component {
  render() {
    return (
      <div>
        <LocationInput />
        <App />
      </div>
    )
  }
}


export default withScriptjs(mapWrapper);
