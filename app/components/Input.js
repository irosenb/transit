import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      destination: {},
      currentLocation: {},
    }
  }
}
