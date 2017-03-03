/* eslint-disable */
import uuid from 'uuid';

// get the position of an antipode
export const getAntipodePosition = podeMarker => {
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
export const createAntipodeMarkers = podeMarkers => {
  //console.log("podeMarkers",podeMarkers);
  const newPodeMarkers = {};
  Object.values(podeMarkers).forEach(function(marker){
    const antipodePosition = getAntipodePosition(marker.position);
    newPodeMarkers[marker.key] = newMarkerObject(antipodePosition, marker.key);
  });
  return newPodeMarkers;
}


// create a marker object
export const newMarkerObject = (position, key=uuid.v4(), address="default name", defaultAnimation=0) => (
  {
    position,
    address,
    defaultAnimation,
    key
  }
)
