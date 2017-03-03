import { fork } from 'redux-saga/effects';
import reverseGeocoding from './reverseGeocoding';
import weatherSaga from './weatherSaga';

export default function* rootSaga() {
  yield [
    fork(reverseGeocoding),
    fork(weatherSaga),
  ];
}
