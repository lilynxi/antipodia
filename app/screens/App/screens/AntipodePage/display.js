/* eslint-disable */

import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { addMarker } from 'state/actions/actions';
// import { getAntipodePosition } from 'locationUtils';


class Display extends Component {

  render() {
    // this.props.type
    // this.props.markers
    //console.log("type",this.props.type, this.props.markers);
    return (
      <div>display</div>
    )
  }
  // render() {
  //   const {state} = this.props;
  //   const markers = Object.values(state.markers);
  //   const marker = markers[markers.length - 1];
  //   const antipodePos = getAntipodePosition(marker.position);
  //
  //
  //   return (
  //     <div>
  //       {this.props.type === "pode" &&
  //         <div>
  //           <div>{ marker.address.pode }</div>
  //           <div>lat: { marker.position.lat } / lng { marker.position.lng }</div>
  //         </div>
  //       }
  //       {this.props.type === "antipode" &&
  //         <div>
  //           <div>{ marker.address.antipode }</div>
  //           <div>lat: { antipodePos.lat } / lng { antipodePos.lng }</div>
  //         </div>
  //       }
  //     </div>
  //   )
  // }
}


export default Display;

// const DisplayWithStateFromRedux = connect(state => ({
//   state
// }))(Display);
//
// export default DisplayWithStateFromRedux;
