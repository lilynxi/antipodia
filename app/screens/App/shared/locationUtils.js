/* eslint-disable */
import uuid from 'uuid';

// calculate the position of an antipode
export const calculateAntipodePosition = (podeMarker) => {
  const antipodeLat = -podeMarker.lat;
  let antipodeLng;

  if(podeMarker.lng<=0){
    antipodeLng = 180+podeMarker.lng;
  } else {
    antipodeLng = -(180-podeMarker.lng);
  }

  return {
    lat: antipodeLat,
    lng: antipodeLng,
  }
}

// create antipode markers array
export const createAntipodeMarkers = (podeMarkers) => {
  return (
    Object.values(podeMarkers).map(function(marker){
      const antipodePosition = calculateAntipodePosition(marker.position);
      return newMarkerObject(antipodePosition);
    })
  )
}

// create a marker object
export const newMarkerObject = (position, address="default name", defaultAnimation=0) => {
  return {
    position,
    address,
    defaultAnimation,
    key: uuid.v4()
  }
}
