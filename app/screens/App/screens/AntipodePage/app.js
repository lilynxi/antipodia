/* eslint-disable */

import React, { Component } from 'react';
import withScriptjs from "react-google-maps/lib/async/withScriptjs";
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';


const GoogleMapWrapper = withScriptjs(withGoogleMap ( props => console.log(props) || (
  <GoogleMap defaultZoom={3} defaultCenter={{ lat: -25.363882, lng: 131.044922 }} />
)));

const App = () => {
  return (
    <div style={{ height: `400px`, maxWidth:`600px` }}>
      <GoogleMapWrapper
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp"
        loadingElement={<div>Loading</div>}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  )
}



export default App;




// Wrap all `react-google-maps` components with `withGoogleMap` HOC
// and name it GettingStartedGoogleMap
// const GettingStartedGoogleMap = withGoogleMap(props => (
//   <GoogleMap
//     ref={props.onMapLoad}
//     defaultZoom={3}
//     defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
//     onClick={props.onMapClick}
//   >
//     {props.markers.map((marker, index) => (
//       <Marker
//         {...marker}
//         onRightClick={() => props.onMarkerRightClick(index)}
//       />
//     ))}
//   </GoogleMap>
// ));
// // Then, render it:
// render(
//   <GettingStartedGoogleMap
//     containerElement={
//       <div style={{ height: `100%` }} />
//     }
//     mapElement={
//       <div style={{ height: `100%` }} />
//     }
//     onMapLoad={_.noop}
//     onMapClick={_.noop}
//     markers={markers}
//     onMarkerRightClick={_.noop}
//   />,
//   document.getElementById('root')
// );
