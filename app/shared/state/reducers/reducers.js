/* eslint-disable */
/**
 * Reducers
 */


import { ADD_MARKER, ADD_MARKER_ADDRESS, ADD_WEATHERDATA } from '../actions/actions';
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
      weather: {
        pode: undefined,
        antipode: undefined,
      },
      streetview: {
        pode: undefined,
        antipode: undefined,
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
          // ...state.markers,
          [action.marker.key]: action.marker,
        },
      };

    case ADD_MARKER_ADDRESS:
      return {
        ...state,
        markers: {
          // ...state.markers,
          [action.key]: {
            ...state.markers[action.key],
            address: action.address,
          },
        },
      };

    case ADD_WEATHERDATA:
    //console.log(action.weather.pode);
    //console.log(action.weather.pode.weather[0].description);
    // T(°C) = (T(°F) - 32) / 1.8
    // const podeWeatherDesc = action.weather.pode.weather[0].description;
    const podeWeather = action.weather.pode && action.weather.pode.main && action.weather.pode.main.temp - 273.15;
    const antipodeWeather = action.weather.antipode && action.weather.antipode.main && action.weather.antipode.main.temp - 273.15;
    //console.log(podeWeather);
    // console.log(antipodeWeather);
      return {
        ...state,
        markers: {
          // ...state.markers,
          [action.key]: {
            ...state.markers[action.key],
            weather: {
              pode: {
                desc: action.weather.pode.weather[0].description,
                temp: podeWeather,
              },
              antipode: {
                desc: action.weather.antipode.weather[0].description,
                temp: antipodeWeather,
              }
            },
          },
        }
      };

    default:
      return state
  }
}
