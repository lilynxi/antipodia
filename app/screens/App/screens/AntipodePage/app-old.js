/* eslint-disable */

import React, { Component } from 'react';
import Map from './map';
import AddressDisplay from './addressDisplay';
import { connect } from 'react-redux';
import { addMarker } from 'state/actions/actions';
import { createAntipodeMarkers, getAntipodePosition, newMarkerObject } from 'locationUtils';






class App extends Component {

  handlePodeClick = (latlng) => {
    const newPosition = {
      lat: latlng.lat,
      lng: latlng.lng,
    };
    const newMarker = newMarkerObject(newPosition);

    this.props.dispatch(addMarker(newMarker));
  }


  handleAntipodeClick = (latlng) => {
    const newPosition = getAntipodePosition(latlng);
    const newMarker = newMarkerObject(newPosition);

    this.props.dispatch(addMarker(newMarker));
  }


  render() {
    const {dispatch, state} = this.props;

    const antipodeMarkers = createAntipodeMarkers(state.markers);
    const antipodeCenter = getAntipodePosition(state.center);
    //console.log(state.center);

    if (!state) {
    	return null;
    }

    return (
      <div>
        <div style={{ float:`left`, width:`420px` }}>
          <Map markers={state.markers} center={state.center} handleClick={this.handlePodeClick}/>
          <AddressDisplay type="pode"/>
        </div>
        <div style={{ float:`left`, width:`420px` }}>
          <Map markers={antipodeMarkers} center={antipodeCenter} handleClick={this.handleAntipodeClick}/>
          <AddressDisplay type="antipode"/>
        </div>
      </div>
    )
  }
}



const AppWithStateFromRedux = connect(state => ({
  state
}))(App);

export default AppWithStateFromRedux;
