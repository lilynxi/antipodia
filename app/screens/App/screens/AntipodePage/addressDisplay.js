/* eslint-disable */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addMarker } from '../../../../shared/state/actions/actions';




class AddressDisplay extends Component {



  render() {
    const {dispatch, state} = this.props;
    return (
      <div>
        {state.markers[state.markers.length-1].address}
      </div>
    )
  }
}


const AddressDisplayWithStateFromRedux = connect(state => ({
  state
}))(AddressDisplay);

export default AddressDisplayWithStateFromRedux;
