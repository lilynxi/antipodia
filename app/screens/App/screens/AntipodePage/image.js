/* eslint-disable */

import React, { Component } from 'react';

const Image = ({ address }) => (
  //<div>google streetview</div>
  <img src={`http://maps.googleapis.com/maps/api/streetview?size=640x480&location=${address}&fov=120&heading=235&pitch=10&sensor=false`} />
);

export default Image;
