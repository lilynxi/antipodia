/* eslint-disable */

import React, { Component } from 'react';
import Map from './map';
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
const newMarkerObject = (position, defaultAnimation=0) => {
  return {
    position,
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

    if (!state) {
    	return null;
    }

    return (
      <div>
        <Map markers={state.markers} initCenter={state.markers[0].position} handleClick={this.handlePodeClick}/>
        <Map markers={antipodeMarkers} initCenter={antipodeMarkers[0].position} handleClick={this.handleAntipodeClick}/>
      </div>
    )
  }
}



const AppWithStateFromRedux = connect(state => ({
  state
}))(App);

export default AppWithStateFromRedux;
