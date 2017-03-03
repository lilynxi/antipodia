/* eslint-disable */
/**
 * Actions
 */

export const ADD_MARKER = 'ADD_MARKER';
export const ADD_MARKER_ADDRESS = 'ADD_MARKER_ADDRESS';
export const ADD_WEATHERDATA = 'ADD_WEATHERDATA';

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

export const addWeatherData = (key,pode,antipode) => (
  {
    type: ADD_WEATHERDATA,
    key,
    weather: {
      pode,
      antipode,
    },
  }
)
