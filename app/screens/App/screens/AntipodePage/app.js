/* eslint-disable */

import React, { Component } from 'react';
import Location from './location';
import Search from './search';
import withScriptjs from "react-google-maps/lib/async/withScriptjs";
import { connect } from 'react-redux';
import { addMarker } from 'state/actions/actions';
import { createAntipodeMarkers, getAntipodePosition, newMarkerObject } from 'locationUtils';




class App extends Component {

  handlePodeClick = (latlng) => {
    const newMarker = newMarkerObject(latlng);
    this.props.dispatch(addMarker(newMarker));
  }


  handleAntipodeClick = (latlng) => {
    const newMarker = newMarkerObject(getAntipodePosition(latlng));
    this.props.dispatch(addMarker(newMarker));
  }


  render() {
    const {state} = this.props;

    return (
      <div>
        <Search />
        <Location type="pode" markers={state.markers} center={state.center} handleClickApp={this.handlePodeClick}/>
        <Location type="antipode" markers={createAntipodeMarkers(state.markers)} center={getAntipodePosition(state.center)} handleClickApp={this.handleAntipodeClick}/>
      </div>
    )
  }
}






const AppWithStateFromRedux = connect(state => ({
  state
}))(App);

export default withScriptjs(AppWithStateFromRedux);
