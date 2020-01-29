import React from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, KeyboardAvoidingView } from 'react-native'
import { LinearGradient } from 'expo';
import MapView, {Polyline} from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    }
  }

  componentDidMount() {

  }

  // componentDidMount() {
  //   this.watchId = navigator.geolocation.watchLocation(
  //     (position) => {
  //       this.setState({
  //         latitude: position.coords.latitude,
  //         longitude: position.coords.longitude,
  //       })
  //     },
  //     (error) => {
  //       this.setState({error: error.message})
  //     },
  //     {}
  //   )
  // }

  onRegionChange(region) {
    this.setState({ region })
  }

  onChangeText(text) {

  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          initialRegion={this.state.region}
          onRegionChange={this.onRegionChange.bind(this)}
          showsUserLocation={true}
          style={styles.map}>
          <Polyline
                coordinates={[
                  { latitude: 37.8025259, longitude: -122.4351431 },
                  { latitude: 37.7896386, longitude: -122.421646 },
                  { latitude: 37.7665248, longitude: -122.4161628 },
                  { latitude: 37.7734153, longitude: -122.4577787 },
                  { latitude: 37.7948605, longitude: -122.4596065 },
                  { latitude: 37.8025259, longitude: -122.4351431 }
                ]}
                strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                strokeColors={[
                  '#7F0000',
                  '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                  '#B24112',
                  '#E5845C',
                  '#238C23',
                  '#7F0000'
                ]}
                strokeWidth={6}
          />
        </MapView>
        <GooglePlacesAutocomplete
          placeholder="Search"
          fetchDetails={true}
          renderDescription={row => row.description}
          onPress={(data, details = null) => {
            console.log(data, details);
            
          }}
          query={{
            key: "AIzaSyBR8c4Z0ZZUk7d7ZNIR_acbwKBxo5WI9jA",
            language: 'en',
          }}
          styles={{
            textInputContainer: {
              width: '100%',
            },
            description: {
              fontWeight: 'bold'
            },
            listView: {
            }
          }}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  latlng: {
    position: 'absolute',
    top: 0,

  },
  search: {
    backgroundColor: "#fff",
    width: "50%",
    height: 50,
    bottom: 350,
    borderWidth: 6,
    borderColor: "#897AD4",
    borderRadius: 6,
  },
  map: {
      flex: 1,
    }
});
