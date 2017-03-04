/* eslint-disable */

import React, { Component } from 'react';
import Map from './map';
import Display from './display';
import Weather from './weather';
import Image from './image';

import styled from 'styled-components';


const WeatherWrapper = styled.section`
  margin-bottom: 1rem;
  font-weight: bold;
  padding-left: 1rem;
`;

const DisplayWrapper = styled.section`
  background: #1f2532;
  color: white;
  margin-bottom: 1rem;
  padding: 1rem;
`;



class Location extends Component {

  handleClick = (latlng) => {
    this.props.handleClickApp(latlng);
  }

  render() {
    return (
      <div>
        <Map markers={this.props.markers} center={this.props.center} handleClickLocation={this.handleClick}/>
        <DisplayWrapper>
          <Display type={this.props.type} markers={this.props.markers} address={this.props.address} />
        </DisplayWrapper>
        <WeatherWrapper>
          <Weather weather={this.props.weather}/>
        </WeatherWrapper>
        <Image address={this.props.address} />
      </div>
    )
  }
}

export default Location;
