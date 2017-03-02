/* eslint-disable */
/**
 * Reducers
 */


import { ADD_MARKER, ADD_MARKER_ADDRESS } from '../actions/actions';
import update from 'react-addons-update';
import uuid from 'uuid';

const initialCenter = {
  lat: -25,
  lng: 131,
};

const initialKey = uuid.v4();
const initialState = {
  center: initialCenter,
  markers: {
    [initialKey]: {
      position: initialCenter,
      address: {
        pode: "pode location",
        antipode: "antipode location",
      },
      defaultAnimation: 0,
      key: initialKey,
    },
  },
};

export default (state = initialState, action) => {
  switch(action.type) {
    case ADD_MARKER:
      return {
        ...state,
        center: action.marker.position,
        markers: {
          ...state.markers,
          [action.marker.key]: action.marker,
        },
      };

    case ADD_MARKER_ADDRESS:
      return {
        ...state,
        markers: {
          ...state.markers,
          [action.key]: {
            ...state.markers[action.key],
            address: action.address,
          },
        },
      };

    default:
      return state
  }
}
