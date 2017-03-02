/* eslint-disable */
/**
 * Actions
 */

export const ADD_MARKER = 'ADD_MARKER';
export const ADD_MARKER_ADDRESS = 'ADD_MARKER_ADDRESS';

export const addMarker = (marker) => (
  {
    type: ADD_MARKER,
    marker,
  }
)

export const addMarkerAddress = (key, pode, antipode) => (
  {
    type: ADD_MARKER_ADDRESS,
    key,
    address: {
      pode,
      antipode,
    },
  }
)
