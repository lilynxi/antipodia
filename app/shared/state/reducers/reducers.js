/* eslint-disable */
/**
 * Reducers
 */


import { ADD_MARKER } from '../actions/actions';
import update from 'react-addons-update';
import uuid from 'uuid';

const initialCenter = {
  lat: -25,
  lng: 131,
};

const initialState = {

  center: initialCenter,
  markers: [
    {
      position: initialCenter,
      address: "initial location",
      defaultAnimation: 0,
      key: uuid.v4(),
    }
  ]
};

export default (state = initialState, action) => {
  switch(action.type) {
    case ADD_MARKER:
      return {
        center: action.marker.position,
        markers: [
          ...state.markers,
          action.marker
        ]
      }
    default:
      return state
  }
}
