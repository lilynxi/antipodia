/* eslint-disable */

import React, { Component } from 'react';
import { getAntipodePosition } from 'locationUtils';


class Display extends Component {

  render() {
    const marker = Object.values(this.props.markers)[Object.values(this.props.markers).length-1];

    return (
      <div>
        <div>{ this.props.address }</div>
        <div>lat: { marker.position.lat } / lng { marker.position.lng }</div>
      </div>
    )
  }
}


export default Display;
