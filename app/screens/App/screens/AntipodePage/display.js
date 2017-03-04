/* eslint-disable */

import React, { Component } from 'react';
import { getAntipodePosition } from 'locationUtils';
import styled from 'styled-components';

const WrappedTitle = styled.h3`
  margin-bottom: -1rem;
  margin-top: 0;
`
const WrappedSubtitle = styled.h5`
  margin-bottom: 0.2rem;
`



class Display extends Component {

  render() {
    const marker = Object.values(this.props.markers)[Object.values(this.props.markers).length-1];

    return (
      <div>
        <WrappedTitle>{ this.props.address }</WrappedTitle>
        <WrappedSubtitle>lat: { marker.position.lat } / lng { marker.position.lng }</WrappedSubtitle>
      </div>
    )
  }
}


export default Display;
