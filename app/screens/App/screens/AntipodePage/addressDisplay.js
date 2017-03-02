/* eslint-disable */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addMarker } from 'state/actions/actions';


class AddressDisplay extends Component {
  render() {
    const {state} = this.props;
    const markers = Object.values(state.markers);
    const marker = markers[markers.length - 1];


    return (
      <div>
        {this.props.type === "pode" && marker.address.pode }
        {this.props.type === "antipode" && marker.address.antipode }
      </div>
    )
  }
}

// {marker.address && marker.address.pode }
// {marker.address && marker.address.antipode }


const AddressDisplayWithStateFromRedux = connect(state => ({
  state
}))(AddressDisplay);

export default AddressDisplayWithStateFromRedux;
