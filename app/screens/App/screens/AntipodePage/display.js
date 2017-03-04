/* eslint-disable */

import React, { Component } from 'react';
import { getAntipodePosition } from 'locationUtils';
import styled from 'styled-components';

const WrappedTitle = styled.h3`
  margin-bottom: -1rem;
  margin-top: 0;
  font-weight: 700;
`;

const WrappedSubtitle = styled.h5`
  margin-bottom: 0.2rem;
`;

const Display = ({ markers, address }) => {
  const marker = Object.values(markers).pop();

  return (
    <div>
      <WrappedTitle>{address}</WrappedTitle>
      <WrappedSubtitle>lat: {marker.position.lat} / lng {marker.position.lng}</WrappedSubtitle>
    </div>
  );
}

export default Display;
