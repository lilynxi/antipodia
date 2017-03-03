/* eslint-disable */

import React, { Component } from 'react';

class Image extends Component {
  render() {
    return (
      <img src={`http://maps.googleapis.com/maps/api/streetview?size=640x480&location=${this.props.address}&fov=120&heading=235&pitch=10&sensor=false`} />
    );
  }
}


export default Image;
