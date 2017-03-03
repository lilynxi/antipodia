/* eslint-disable */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addMarker } from 'state/actions/actions';
import { calculateAntipodePosition } from 'locationUtils';


class AddressDisplay extends Component {
  render() {
    const {state} = this.props;
    const markers = Object.values(state.markers);
    const marker = markers[markers.length - 1];
    const antipodePos = calculateAntipodePosition(marker.position);


    return (
      <div>
        {this.props.type === "pode" &&
          <div>
            <div>{ marker.address.pode }</div>
            <div>lat: { marker.position.lat } / lng { marker.position.lng }</div>
          </div>
        }
        {this.props.type === "antipode" &&
          <div>
            <div>{ marker.address.antipode }</div>
            <div>lat: { antipodePos.lat } / lng { antipodePos.lng }</div>
          </div>
        }
      </div>
    )
  }
}




const AddressDisplayWithStateFromRedux = connect(state => ({
  state
}))(AddressDisplay);

export default AddressDisplayWithStateFromRedux;
