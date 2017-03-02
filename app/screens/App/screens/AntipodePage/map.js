/* eslint-disable */

import React, { Component } from 'react';
import withScriptjs from "react-google-maps/lib/async/withScriptjs";
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { connect } from 'react-redux';
import { addMarker } from '../../../../shared/state/actions/actions';
import uuid from 'uuid';




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


  handleMapLoad = (map) => {
    this._mapComponent = map;
    if (map) { console.log("zoom",map.getZoom()); }
  }


  handleMapClick = (event) => {
    const {dispatch} = this.props;

    const newPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    const newMarker = {
      position: newPosition,
      defaultAnimation: 2,
      key: uuid.v4(),
    }

    const newAntipodePosition = calcLatLng(newPosition);

    dispatch(addMarker(newMarker));
  }



  render() {
    const {dispatch, state} = this.props;

    if (!state) {
			return null;
		}

    return (
      <div style={{ height: `300px`, maxWidth:`400px` }}>
        <GoogleMapWrapper
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp"
          loadingElement={<div>Loading</div>}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          initialCenter={state.markers[0].position}
          markers={state.markers}
          onMapLoad={this.handleMapLoad}
          onMapClick={this.handleMapClick}
        />
      </div>
    )
  }
}

const withStateFromRedux = connect(state => ({
  state
}));

const MapWithStateFromRedux = withStateFromRedux(Map);

export default MapWithStateFromRedux;

// export default connect(state => ({
//   state
// }))(Map);




// const EnhancedCounter = compose(
//   withState('counter1', 'setCounter', 0),
//   withReducer('counter2', 'dispatch', counterReducer, 0),
//   withRouter,
// )(Counter);
