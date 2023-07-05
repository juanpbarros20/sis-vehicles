import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Stack, useRouter } from 'expo-router';
import * as Location from 'expo-location';

export default function VehicleDetails() {
  const router = useRouter();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const mapRef = React.useRef(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android' && !Device.isDevice) {
        setErrorMsg(
          'Oops, this will not work on Snack in an Android Emulator. Try it on your device!'
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const locationListener = Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, distanceInterval: 10 },
        (newLocation) => {
          setLocation(newLocation);
          if (mapRef.current) {
            mapRef.current.animateToRegion({
              latitude: newLocation.coords.latitude,
              longitude: newLocation.coords.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005
            });
          }
        }
      );

      return () => {
        if (locationListener) {
          locationListener.remove();
        }
      };
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const initialRegion = {
    latitude: location ? location.coords.latitude : 0,
    longitude: location ? location.coords.longitude : 0,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

  const formatSpeed = (speed) => {
    if (speed < 2) {
      return '00.00';
    } else {
      return (speed * 3.6).toFixed(2);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acompanhe seu Veículo</Text>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={initialRegion}
      >
        {location && (
          <Marker coordinate={location.coords} title="Você está aqui" />
        )}
      </MapView>

      <View style={styles.separatorLine} />

      <View style={styles.detailsContainer}>
        <Text style={styles.speedText}>
          Velocidade Atual: {location ? formatSpeed(location.coords.speed) : 'N/A'} km/h
        </Text>
        <Text style={styles.speedText}>Distância percorrida: N/A km</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Text
          style={styles.button}
          onPress={() => {
            // Go back to the previous screen using the imperative API.
            router.replace('/(tabs)/vehicle/vehicleList');
          }}
        >
          Voltar
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#F9F9F9',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1C3C6C',
  },
  map: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  separatorLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#888',
    marginBottom: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: '5%',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    fontSize: 18,
    color: 'white',
    backgroundColor: '#1C3C6C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  detailsContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  speedText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1C3C6C',
  },
});
