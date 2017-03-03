/* eslint-disable */

import React, { Component } from 'react';
import Location from './location';
import Search from './search';
import withScriptjs from "react-google-maps/lib/async/withScriptjs";
import { connect } from 'react-redux';
import { addMarker } from 'state/actions/actions';
import { createAntipodeMarkers, getAntipodePosition, newMarkerObject } from 'locationUtils';
import styled from 'styled-components';


const Wrapper = styled.section`
  padding: 1rem;
  background: #eee;
`;




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
    const lastMarker = Object.values(state.markers).pop(); //  -->  Object.values(state.markers)[Object.values(state.markers).length-1];
    const podeAdress = lastMarker.address.pode;
    const antipodeAdress = lastMarker.address.antipode;
    const podeWeather = lastMarker.weather.pode;
    const antipodeWeather = lastMarker.weather.antipode;

    return (
      <Wrapper>
        <Search />
        <Location
          type="pode"
          markers={state.markers}
          center={state.center}
          address={podeAdress}
          weather={podeWeather}
          handleClickApp={this.handlePodeClick}
        />
        <Location
          type="antipode"
          markers={createAntipodeMarkers(state.markers)}
          center={getAntipodePosition(state.center)}
          address={antipodeAdress} weather={antipodeWeather}
          handleClickApp={this.handleAntipodeClick}
        />
      </Wrapper>
    )
  }
}



const AppWithStateFromRedux = connect(state => ({
  state
}))(App);

export default withScriptjs(AppWithStateFromRedux);
