/* eslint-disable */

import React, { Component } from 'react';
import Map from './map';
import AddressDisplay from './addressDisplay';
import { connect } from 'react-redux';
import { addMarker } from '../../../../shared/state/actions/actions';
import uuid from 'uuid';





// calculate the position of an antipode
const calculateAntipodePosition = (podeMarker) => {
  const antipodeLat = -podeMarker.lat;
  let antipodeLng;

  if(podeMarker.lng<=0){
    antipodeLng = 180+podeMarker.lng;
  } else {
    antipodeLng = -(180-podeMarker.lng);
  }

  return {
    lat: antipodeLat,
    lng: antipodeLng,
  }
}

// create antipode markers array
const createAntipodeMarkers = (podeMarkers) => {
  return (
    podeMarkers.map(function(marker){
      const antipodePosition = calculateAntipodePosition(marker.position);
      return newMarkerObject(antipodePosition);
    })
  )
}

// create a marker object
export const newMarkerObject = (position, address="default name", defaultAnimation=0) => {
  return {
    position,
    address,
    defaultAnimation,
    key: uuid.v4()
  }
}




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
    const newPosition = calculateAntipodePosition(latlng);
    const newMarker = newMarkerObject(newPosition);

    this.props.dispatch(addMarker(newMarker));
  }


  render() {
    const {dispatch, state} = this.props;

    const antipodeMarkers = createAntipodeMarkers(state.markers);
    const antipodeCenter = calculateAntipodePosition(state.center);

    if (!state) {
    	return null;
    }

    return (
      <div>
        <div style={{ float:`left`, width:`420px` }}>
          <Map markers={state.markers} center={state.center} handleClick={this.handlePodeClick}/>
          <AddressDisplay />
        </div>
        <div style={{ float:`left`, width:`420px` }}>
          <Map markers={antipodeMarkers} center={antipodeCenter} handleClick={this.handleAntipodeClick}/>
          <AddressDisplay />
        </div>
      </div>
    )
  }
}



const AppWithStateFromRedux = connect(state => ({
  state
}))(App);

export default AppWithStateFromRedux;
