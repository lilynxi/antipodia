import { fork } from 'redux-saga/effects';
import reverseGeocoding from './reverseGeocoding';

export default function* rootSaga() {
  yield [
    fork(reverseGeocoding),
  ];
}
