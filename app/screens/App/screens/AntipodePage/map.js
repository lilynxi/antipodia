/* eslint-disable */

import React, { Component } from 'react';
import withScriptjs from "react-google-maps/lib/async/withScriptjs";
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';




const GoogleMapWrapper = withScriptjs(withGoogleMap ( props =>  (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={3}
    defaultCenter={props.initialCenter}
    onClick={props.onMapClick}
  >
  {props.markers.map(marker => (
    <Marker
      {...marker}
    />
  ))}
  </GoogleMap>
)));



//
// calculate antipode lat & lng
//
const calcLatLng = (newPosition) => {

  const antipodeLat = -newPosition.lat;
  let antipodeLng;

  if(newPosition.lng<=0){
    antipodeLng = 180+newPosition.lng;
  } else {
    antipodeLng = -(180-newPosition.lng);
  }
  return {
    lat: antipodeLat,
    lng: antipodeLng,
  }
}



class Map extends Component {

  state = {
    markers: [{
      position: {
        lat: -25,
        lng: 131,
      },
      key: `Initial Marker`,
      defaultAnimation: 2,
    }],
    antipodeMarkers: [{
      position: {
        lat: 25,
        lng: -49,
      },
      key: `Initial AntipodeMarker`,
      defaultAnimation: 2,
    }]
  };



  handleMapLoad = (map) => {
    this._mapComponent = map;
    if (map) { console.log("zoom",map.getZoom()); }
  }

  handleMapClick = (event) => {
    const newPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    const newAntipodePosition = calcLatLng(newPosition);

    const nextMarkers = [
      ...this.state.markers,
      {
        position: newPosition,
        defaultAnimation: 2,
        key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
      },
    ];
    const nextAntipodeMarkers = [
      ...this.state.antipodeMarkers,
      {
        position: newAntipodePosition,
        defaultAnimation: 2,
        key: Date.now()+10,
      }
    ]

    this.setState({
      markers: nextMarkers,
      antipodeMarkers: nextAntipodeMarkers,
    });

    console.log("nextMarkers",nextMarkers);
    console.log("nextAntipodeMarkers",nextAntipodeMarkers);
  }

  render() {
    return (
      <div style={{ height: `300px`, maxWidth:`400px` }}>
        <GoogleMapWrapper
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp"
          loadingElement={<div>Loading</div>}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          initialCenter={this.props.initialCenter}
          markers={this.state.markers}
          onMapLoad={this.handleMapLoad}
          onMapClick={this.handleMapClick}
        />
      </div>
    )
  }
}


export default Map;
