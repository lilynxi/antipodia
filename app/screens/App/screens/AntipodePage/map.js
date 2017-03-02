/* eslint-disable */

import React, { Component } from 'react';
import withScriptjs from "react-google-maps/lib/async/withScriptjs";
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';



class Map extends Component {

  handleMapLoad = (map) => {
    this._mapComponent = map;
    if (map) { console.log("zoom",map.getZoom()); }
  }

  onMapClick = (event) => {
    const latlng = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    }

    this.props.handleClick(latlng);
  }

  render() {
    return (
      <div style={{ height: `300px`, maxWidth:`400px` }}>
        <GoogleMapWrapper
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp"
          loadingElement={<div>Loading</div>}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          initialCenter={this.props.initCenter}
          markers={this.props.markers}
          onMapLoad={this.handleMapLoad}
          onMapClick={this.onMapClick}
        />
      </div>
    )
  }
}


export default Map;



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






// const EnhancedCounter = compose(
//   withState('counter1', 'setCounter', 0),
//   withReducer('counter2', 'dispatch', counterReducer, 0),
//   withRouter,
// )(Counter);
