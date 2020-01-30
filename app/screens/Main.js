import React from 'react';
import { StyleSheet, Dimensions, Text, View, StatusBar, TextInput, KeyboardAvoidingView } from 'react-native'
import { LinearGradient } from 'expo';
import MapView, {Polyline} from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';

const { width, height } = Dimensions.get('window');

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
      },
      destination: {},
      currentLocation: {},
    }
    this.mapView = null;
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position);
        this.setState({currentLocation: position})
      },
      error => Alert.alert(error.message)
    )
  }

  onRegionChange(region) {
    this.setState({ region })
  }

  onChangeText(text) {

  }

  onPress(data, details) {

  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          initialRegion={this.state.region}
          onRegionChange={this.onRegionChange.bind(this)}
          showsUserLocation={true}
          style={styles.map}
          ref={c => this.mapView = c}>
          <MapViewDirections
            origin={this.state.currentLocation.coords}
            destination={this.state.destination}
            apikey="AIzaSyBR8c4Z0ZZUk7d7ZNIR_acbwKBxo5WI9jA"
            mode="TRANSIT"
            strokeWidth={3}
            onStart={(params) => {
              console.log(params);
            }}
            onReady={result => {
              console.log(result);
              this.mapView.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: (width / 20),
                  bottom: (height / 20),
                  left: (width / 20),
                  top: (height / 20),
                }
              })
            }}></MapViewDirections>
        </MapView>
        <GooglePlacesAutocomplete
          placeholder="Search"
          fetchDetails={true}
          renderDescription={row => row.description}
          onPress={(data, details = null) => {
            console.log(data, details);
            this.setState({destination: {
              "latitude": details.geometry.location.lat,
              "longitude": details.geometry.location.lng
            }})
            console.log(details.geometry.location)
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
