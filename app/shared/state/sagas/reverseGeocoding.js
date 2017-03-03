/* eslint-disable */

import { take, call, put } from 'redux-saga/effects'
import { ADD_MARKER, addMarkerAddress } from 'state/actions/actions';
import { getAntipodePosition } from 'App/shared/locationUtils';

const fetchReverseGeocodeForMarker = async (position) => {
  return new Promise((resolve, reject) => {
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ location: position }, (results, status) => {
      //console.log('results',results,'status', status);

      if (status && status === google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          resolve(results[1].formatted_address);
        } else {
          reject(status);
        }
      } else {
        resolve("No location found");
        //reject(status);
      }
    });
  });
};

export default function* reverseGeocodingSaga() {
  while (true) {
    const action = yield take(ADD_MARKER);

    let pode;
    let antipode;

    try {
      [pode, antipode] = yield [
        call(fetchReverseGeocodeForMarker, action.marker.position),
        call(fetchReverseGeocodeForMarker, getAntipodePosition(action.marker.position)),
      ];
    } catch (e) {
      // Swallow fetch errors.
    }

    yield put(addMarkerAddress(action.marker.key, pode, antipode));
  }
}
