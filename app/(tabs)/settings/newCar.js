import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase-config';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from 'react-native-vector-icons';
import { useRouter, Link } from 'expo-router';

const AddVehicle = ({ setVehicles }) => {
  const router = useRouter();
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
        console.error('veiculo adicionado veículo:');
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
  
    if (!result.canceled) {
      setPhoto(result.uri);
    }
  };

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Desculpe, precisamos de permissão para acessar a câmera e a galeria para adicionar fotos.');
      return;
    }
  
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      setPhoto(result.uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Cadastre um novo Veículo</Text>
      </View>
      <View style={styles.inputContainer}>
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
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSelectImage}>
          <Ionicons name="image" size={20} color="white" />
          <Text style={styles.selectImageText}>Galeria</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
          <Ionicons name="camera" size={20} color="white" />
          <Text style={styles.selectImageText}>Foto</Text>
        </TouchableOpacity>
      </View>
      {photo && (
        <Image source={{ uri: photo }} style={styles.photo} />
      )}
      <TouchableOpacity style={styles.buttonAdicionar} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonVoltar} onPress={() => router.push('/settings')}>
        <Text style={styles.buttonTextCancel}>Cancelar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C3C6C',
  },
  inputContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 38,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    paddingLeft: 8,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: '#1C3C6C',
    padding: 8,
    width: '48%',
  },
  selectImageText: {
    marginLeft: 8,
    color: 'white',
    fontSize: 14,
  },
  buttonAdicionar: {
    marginBottom: 8,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#1C3C6C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonVoltar: {
    marginBottom: 8,
    paddingVertical: 6,
    borderRadius: 8,
    borderColor: '#1C3C6C',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonTextCancel: {
    color: '#1C3C6C',
    fontSize: 14,
  },
  photo: {
    width: '100%',
    height: 200,
    marginBottom: 12,
    borderRadius: 8,
  },
});

export default AddVehicle;
