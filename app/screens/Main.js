import React from 'react';
import { StyleSheet, Dimensions, Text, View, StatusBar, TextInput, KeyboardAvoidingView } from 'react-native'
import { LinearGradient } from 'expo';
import { Button } from 'react-native-elements';
import MapView, {Polyline, Geojson} from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
// import Geojson from 'react-native-geojson';
const { width, height } = Dimensions.get('window');

class Main extends React.Component {
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
      muni: {},
      coords: []
    }
    this.mapView = null;
    this.onPress = this.onPress.bind(this);
    this.onRoutePress = this.onRoutePress.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position);
        this.setState({currentLocation: position})
      },
      error => Alert.alert(error.message)
    )

    this.fetchMuniRoutes();
  }

  onRegionChange(region) {
    this.setState({ region })
  }

  onChangeText(text) {

  }

  fetchMuniRoutes() {
    const that = this;
    fetch("https://transit.land/api/v1/routes.geojson?operated_by=o-9q8y-sfmta&per_page=false")
      .then((response) => response.json())
      .then((responseJson) => {
        let muni_routes = responseJson['features']
        var coordinates = [];
        muni_routes.forEach(element => {
          element['geometry']['coordinates'].forEach(latlng => {
            var coords = [];
            latlng.forEach((item, i) => {
              coords.push({longitude: item[0], latitude: item[1]})
            });
            coordinates.push(coords);
          })
        });
        that.setState({coords: coordinates, muni: muni_routes});
      })
  }

  onRoutePress(index) {
    let feature = this.state.muni_routes
    console.log(feature);
  }

  search(data) {
    console.log(this.props.navigation.state.params.location);
  }

  onPress(data, details) {
    console.log("works!");
    var origin = this.state.currentLocation.coords.latitude + "," + this.state.currentLocation.coords.longitude;
    var key = "AIzaSyBR8c4Z0ZZUk7d7ZNIR_acbwKBxo5WI9jA"
    var destination = this.state.destination.latitude + "," + this.state.destination.longitude;
    var request = "https://maps.googleapis.com/maps/api/directions/json?origin=" + origin + "&destination=" + destination + "&key=" + key + "&mode=transit"
    console.log(request)
    fetch(request, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  static navigationOptions = ({navigation}) => {
    return {
      headerLeft: () => (
        <Button
          title="Search"
          onPress={() => this.props.navigation.navigate('Search', {
              onGoBack: () => this.search()
            })
          }
          />
      )
    }
  }

  render() {
    const destinationPicked = this.state.destination.latitude !== undefined

    return (
      <View style={styles.container}>
        <MapView
          initialRegion={this.state.region}
          onRegionChange={this.onRegionChange.bind(this)}
          showsUserLocation={true}
          style={styles.map}
          ref={c => this.mapView = c}>
          {this.state.coords.map((coords, index) =>
            <Polyline
              index={index}
              coordinates={coords}
              strokeColor="#000"
              strokeWidth={3}
              onPress={() =>
                this.onRoutePress(index)
              }/>
          )}
        </MapView>
        <View
          style = {{
            position: 'absolute',
            bottom: 30,

          }}>
          <Button
            title="Search"
            onPress={() =>
              this.props.navigation.navigate('Search')
            }
            buttonStyle={styles.search}
            titleStyle={{
              color: 'black'
            }}
            ></Button>
        </View>
      </View>
    );
  }
}

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  latlng: {
    position: 'absolute',
    top: 0,

  },
  search: {
    backgroundColor: "#fff",
    color: "black",
    width: "100%",
    height: 70,
    bottom: 30,
    borderWidth: 6,
    alignItems: 'center',
    borderColor: "#897AD4",
    borderRadius: 6,
  },
  map: {
      flex: 1,
    }
});
