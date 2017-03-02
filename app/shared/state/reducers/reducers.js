/* eslint-disable */
/**
 * Reducers
 */


import { ADD_MARKER } from '../actions/actions';
import update from 'react-addons-update';
import uuid from 'uuid';

const initialState = {
  markers: [
    {
      position: {
        lat: -25,
        lng: 131,
      },
      defaultAnimation: 2,
      key: uuid.v4(),
    }
  ]
};

export default (state = initialState, action) => {
  //console.log(state);
  switch(action.type) {
    case ADD_MARKER:
    //console.log("new marker",action.marker);
      return {
        markers: [
          ...state.markers,
          action.marker
        ]
      }
    default:
      return state
  }

}
