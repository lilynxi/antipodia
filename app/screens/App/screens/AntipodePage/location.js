/* eslint-disable */

import React, { Component } from 'react';
import Map from './map';
import Display from './display';
import Weather from './weather';
import Image from './image';

import styled from 'styled-components';

const StyledLocation = styled.section`
  display: inline-block;
  width: 30rem;
  padding: 1rem;
  background-color: #fff;
`;


class Location extends Component {

  handleClick = (latlng) => {
    this.props.handleClickApp(latlng);
  }

  render() {
    return (
      <StyledLocation>
        <Map markers={this.props.markers} center={this.props.center} handleClickLocation={this.handleClick}/>
        <Display type={this.props.type} markers={this.props.markers} address={this.props.address} />
        <Weather />
        <Image address={this.props.address} />
      </StyledLocation>
    )
  }
}

export default Location;
