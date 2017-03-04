/* eslint-disable */

import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const GoogleMapWrapper = withGoogleMap ( props =>  (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={3}
    center={props.center}
    onClick={props.onMapClick}
  >
  {Object.values(props.markers).map(marker => (
    <Marker
      {...marker}
    />
  ))}
  </GoogleMap>
));

class Map extends Component {
  handleMapLoad = (map) => {
    this._mapComponent = map;
    //if (map) { console.log("zoom",map.getZoom()); }
  }

  onMapClick = (event) => {
    const latlng = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    }

    this.props.handleClickLocation(latlng);
  }

  render() {
    return (
      <div style={{ height: `150px`, width:`100%` }}>
        <GoogleMapWrapper
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          center={this.props.center}
          markers={this.props.markers}
          onMapLoad={this.handleMapLoad}
          onMapClick={this.onMapClick}
        />
      </div>
    )
  }
}

export default Map;
