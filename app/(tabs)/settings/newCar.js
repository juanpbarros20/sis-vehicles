import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity, Text, SafeAreaView } from 'react-native';
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
      setPhoto(result.assets[0].uri);
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
      <TouchableOpacity style={styles.photoButton} onPress={handleSelectImage}>
        <Ionicons name="image-outline" size={20} color="white" />
        <Text style={styles.selectImageText}>Selecionar Imagem</Text>
      </TouchableOpacity>
      {photo && (
        <Image source={{ uri: photo }} style={styles.photo} />
      )}
      <TouchableOpacity style={styles.buttonAdicionar} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonVoltar} onPress={() => router.push('/settings')}>
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  inputContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  input: {
    width: '90%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  photoButton: {
    left: 110,
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#1C3C6C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
  },
  selectImageText: {
    marginLeft: 8,
    color: 'white',
    fontSize: 14,
  },
  buttonAdicionar: {
    left: 110,
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#1C3C6C',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
  },
  buttonVoltar: {
    left: 110,
    marginBottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#1C3C6C',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  photo: {
    width: '100%',
    height: 200,
    marginBottom: 12,
    borderRadius: 8,
  },
});

export default AddVehicle;
