import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity, Text } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase-config';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from 'react-native-vector-icons';

const AddVehicle = ({ setVehicles }) => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [year, setYear] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleSave = async () => {
    if (name && brand && year) {
      const newVehicle = { name, brand, year, photo, userId: auth.currentUser.uid };

      try {
        const docRef = await addDoc(collection(db, 'vehicles'), newVehicle);
        newVehicle.id = docRef.id;
        setVehicles((prevVehicles) => [...prevVehicles, newVehicle]);
        Alert.alert('Veículo adicionado com sucesso');
      } catch (error) {
        console.error('Erro ao adicionar veículo:', error);
      }

      setName('');
      setBrand('');
      setYear('');
      setPhoto(null);
    }
  };

  const handleSelectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Desculpe, precisamos de permissão para acessar a câmera e a galeria para adicionar fotos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setPhoto(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Marca"
        placeholderTextColor="#999"
        value={brand}
        onChangeText={setBrand}
      />
      <TextInput
        style={styles.input}
        placeholder="Ano"
        placeholderTextColor="#999"                                                                                  
        value={year}
        onChangeText={setYear}
        keyboardType="numeric"
      />
      {photo && (
        <Image source={{ uri: photo }} style={styles.photo} />
      )}
      <TouchableOpacity
        style={styles.selectImageButton}
        onPress={handleSelectImage}
      >
        <Ionicons name="image-outline" size={24} color="black" />
        <Text style={styles.selectImageText}>Selecionar Imagem</Text>
      </TouchableOpacity>
      <Button title="Adicionar Veículo" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  selectImageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  selectImageText: {
    marginLeft: 8,
  },
  photo: {
    width: 200,
    height: 150,
    marginBottom: 12,
  },
});

export default AddVehicle;
