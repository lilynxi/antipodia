/* eslint-disable */

import React, { Component } from 'react';
import Map from './map';
import { connect } from 'react-redux';
import { addMarker } from '../../../../shared/state/actions/actions';
import uuid from 'uuid';



//
// calculate antipode lat & lng
//
// const calcLatLng = (newPosition) => {
//
//   const antipodeLat = -newPosition.lat;
//   let antipodeLng;
//
//   if(newPosition.lng<=0){
//     antipodeLng = 180+newPosition.lng;
//   } else {
//     antipodeLng = -(180-newPosition.lng);
//   }
//   return {
//     lat: antipodeLat,
//     lng: antipodeLng,
//   }
// }



  // handleMapClick = (event) => {
  //   const {dispatch} = this.props;
  //
  //   const newPosition = {
  //     lat: event.latLng.lat(),
  //     lng: event.latLng.lng(),
  //   };
  //
  //   const newMarker = {
  //     position: newPosition,
  //     defaultAnimation: 2,
  //     key: uuid.v4(),
  //   }
  //
  //   const newAntipodePosition = calcLatLng(newPosition);
  //
  //   dispatch(addMarker(newMarker));
  // }






class App extends Component {

  handleClick = () => {
    console.log('click');
  }

  render() {
    const {dispatch, state} = this.props;

    if (!state) {
    	return null;
    }

    return (
      <div>
        <Map markers={state.markers} initCenter={state.markers[0].position} handleClick={this.handleClick}/>
        <Map markers={state.markers} initCenter={state.markers[0].position}/>
      </div>
    )
  }
}



// const setMarker = (lat, lon) => ...;
// const getMarker = () => [lat, lon];
// const setMarker = () => originalSetMarker(inverse(lat), inverse(lon))

// export default App;


const AppWithStateFromRedux = connect(state => ({
  state
}))(App);

export default AppWithStateFromRedux;
