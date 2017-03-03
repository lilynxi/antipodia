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
  //console.log(podeMarkers);
  return (
    Object.values(podeMarkers).map(function(marker){
      const antipodePosition = getAntipodePosition(marker.position);
      return newMarkerObject(antipodePosition);
    })
  )
}

// const newPodeMarkers;
// Object
//   .keys(podeMarkers.markers)
//   .forEach((key) => {
//     const entry = podeMarkers[key];
//     entry.markers.whatever = 'newValue';
//     newPodeMarkers[key] = entry;
//   })
//
// for (key in podeMarkers) {
//
// }

//create antipode markers object
// export const createAntipodeMarkers = podeMarkers => {
//
//   let newAntipodeMarkers;
//
//   Object
//     .keys(podeMarkers)
//     .forEach((key) => {
//       //console.log(key);
//       const antipodePosition = getAntipodePosition(podeMarkers[key].position);
//       console.log(newMarkerObject(antipodePosition, key));
//       //return newMarkerObject(antipodePosition);
//       newAntipodeMarkers[key] = newMarkerObject(antipodePosition);
//     })
//
//   return newAntipodeMarkers;
//   // return {
//   //   ...podeMarkers,
//   //   newMarkerObject(getAntipodePosition(marker.position))
//   // }
// }

// create a marker object
export const newMarkerObject = (position, key= uuid.v4(), address="default name", defaultAnimation=0) => {
  //const initialKey = uuid.v4();

  // return {
  //   [key] : {
  //     position,
  //     address,
  //     defaultAnimation,
  //     key: key
  //   }
  // }
  return {
    position,
    address,
    defaultAnimation,
    key: uuid.v4()
  }
}
