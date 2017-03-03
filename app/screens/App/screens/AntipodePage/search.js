/* eslint-disable */

import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress, geocodeByPlaceId } from 'react-places-autocomplete';
import { connect } from 'react-redux';
import { newMarkerObject } from 'locationUtils';
import { addMarker } from 'state/actions/actions';




class Search extends Component {

  constructor(props) {
    super(props)
    this.state = { address: 'San Francisco, CA' }
    this.onChange = (address) => this.setState({ address })
  }

  handleFormSubmit = (event) => {
    event.preventDefault()
    const { address } = this.state;

    geocodeByAddress(address,  (err, { lat, lng }) => {
      if (err) { console.log('Oh no!', err) }

      //console.log(`Yay! got latitude and longitude for ${address}`, { lat, lng })
      const newMarker = newMarkerObject({ lat, lng }, address);

      this.props.dispatch(addMarker(newMarker));
    })
  }



  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <PlacesAutocomplete
            value={this.state.address}
            onChange={this.onChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}


const SearchWithStateFromRedux = connect(state => ({
  state
}))(Search);

export default SearchWithStateFromRedux;