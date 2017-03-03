/* eslint-disable */

import React, { Component } from 'react';
import Map from './map';
import Display from './display';




class Location extends Component {

  handleClick = (latlng) => {
    this.props.handleClickApp(latlng);
  }

  render() {
    return (
      <div style={{ float:`left`, width:`420px` }}>
        <Map markers={this.props.markers} center={this.props.center} handleClickLocation={this.handleClick}/>
        <Display type={this.props.type} markers={this.props.markers}/>
      </div>
    )
  }
}

export default Location;
