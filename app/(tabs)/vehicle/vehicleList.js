import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../../../firebase-config';
import { Stack, useRouter } from "expo-router";

const VehicleList = ({ navigation }) => {
  const [vehicles, setVehicles] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const unsubscribe = onSnapshot(
        query(collection(db, 'vehicles'), where('userId', '==', user.uid)),
        (snapshot) => {
          const userVehicles = [];
          snapshot.forEach((doc) => {
            userVehicles.push({ id: doc.id, ...doc.data() });
          });
          setVehicles(userVehicles);
        }
      );

      return () => unsubscribe();
    }
  }, []);

  const navigateToDetails = (item) => {
    router.replace("/(tabs)/vehicle/vehicleDetails", { vehicle: item });
  };

  return (
    <SafeAreaView style={styles.container}>
      {vehicles.length > 0 ? (
        <FlatList
          data={vehicles}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigateToDetails(item)}>
              <View style={styles.vehicleItem}>
                <View style={styles.vehicleInfo}>
                  {item.photo && <Image source={{ uri: item.photo }} style={styles.vehiclePhoto} />}
                  <View style={styles.textContainer}>
                    <Text style={styles.vehicleName}>{item.name}</Text>
                    <Text style={styles.vehicleBrand}>{item.brand}</Text>
                    <Text style={styles.vehicleYear}>{item.year}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text style={styles.noVehicleText}>Nenhum veículo cadastrado.</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F9F9F9',
  },
  vehicleItem: {
    marginBottom: 16,
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 25,
    elevation: 2,
  },
  vehicleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vehiclePhoto: {
    width: 110,
    height: 100,
    borderRadius: 8,
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
  },
  vehicleName: {
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 4,
  },
  vehicleBrand: {
    fontSize: 15,
    color: '#888',
    marginBottom: 2,
  },
  vehicleYear: {
    fontSize: 15,
    color: '#888',
  },
  noVehicleText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
    color: '#888',
  },
});

export default VehicleList;
