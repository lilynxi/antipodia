/* eslint-disable */

import { take, call, put } from 'redux-saga/effects'
import { ADD_MARKER, ADD_WEATHERDATA, addWeatherData } from 'state/actions/actions';
import { getAntipodePosition } from 'App/shared/locationUtils';

const getWeatherData = async (position) => {
  return global.fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${position.lat}&lon=${position.lng}&APPID=cae5f0d931f0104d163eec25b247f2f1`)
    .then((response) => response.json());
};

export default function* weatherSaga() {
  while (true) {
    const action = yield take(ADD_MARKER);

    let pode;
    let antipode;

    try {
      [pode, antipode] = yield [
        call(getWeatherData, action.marker.position),
        call(getWeatherData, getAntipodePosition(action.marker.position)),
      ];
    } catch (e) {
      // Swallow fetch errors.
    }

    yield put(addWeatherData(action.marker.key, pode, antipode));
  }
}
