import React from 'react';
import { StyleSheet, Dimensions, Text, View, StatusBar, TextInput, KeyboardAvoidingView, AsyncStorage } from 'react-native'
import { LinearGradient } from 'expo';
import { Button } from 'react-native-elements';
import MapView, {Polyline} from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';

const { width, height } = Dimensions.get('window');
export default class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      destination: {},
    }
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <GooglePlacesAutocomplete
           placeholder='Search'
           minLength={2} // minimum length of text to search
           autoFocus={false}
           returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
           keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
           listViewDisplayed='auto'    // true/false/undefined
           fetchDetails={true}
           renderDescription={row => row.description} // custom description render
           onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
             this.props.navigation.state.params.onGoBack(details);
             this.props.navigation.goBack();
           }}

           getDefaultValue={() => ''}

           query={{
             // available options: https://developers.google.com/places/web-service/autocomplete
             key: 'AIzaSyBR8c4Z0ZZUk7d7ZNIR_acbwKBxo5WI9jA',
             language: 'en', // language of the results
           }}

           styles={{
             textInputContainer: {
               width: '100%',
             },
             container: {
               top: 50
             },
             description: {
               fontWeight: 'bold'
             },
             predefinedPlacesDescription: {
               color: '#1faadb'
             }
           }}/>
         <Button
           onPress={() => {
             this.props.navigation.goBack();
           }}
           title="Go back"
           style={styles.button}></Button>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  button: {
    bottom: 100
  }
})
