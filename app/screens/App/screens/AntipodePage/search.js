/* eslint-disable */

import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress, geocodeByPlaceId } from 'react-places-autocomplete';
import { connect } from 'react-redux';
import { newMarkerObject } from 'locationUtils';
import { addMarker } from 'state/actions/actions';
import styled from 'styled-components';

const Form = styled.form`

  > div {
    background: blue;
    width: 70%;
    display: inline-block;
    input {
      width: 100%;
      border: none;
      padding: .8rem;
    }
  }

  > button {
    background: #e12353;
    color: white;
    width: 30%;
    display: inline-block;
    border:none;
    padding: .8rem;
  }
`







class Search extends Component {

  constructor(props) {
    super(props)
    this.state = { address: '' }
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
        <Form onSubmit={this.handleFormSubmit}>

            <PlacesAutocomplete
              value={this.state.address}
              onChange={this.onChange}
              placeholder="Enter a place"
            />

          <button type="submit">Get Antipode</button>
        </Form>
      </div>
    )
  }
}


const SearchWithStateFromRedux = connect(state => ({
  state
}))(Search);

export default SearchWithStateFromRedux;
