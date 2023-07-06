import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Alert, Modal, TextInput, Image } from 'react-native';
import { collection, query, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase-config';
import { useRouter } from 'expo-router';
import { Ionicons } from 'react-native-vector-icons';
import * as ImagePicker from 'expo-image-picker';

const VehicleEdit = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedBrand, setEditedBrand] = useState('');
  const [editedYear, setEditedYear] = useState('');
  const [editedPhoto, setEditedPhoto] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'vehicles'), (snapshot) => {
      const vehicleData = [];
      snapshot.forEach((doc) => {
        vehicleData.push({ id: doc.id, ...doc.data() });
      });
      setVehicles(vehicleData);
    });

    return () => unsubscribe();
  }, []);

  const handleEditVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
    setEditedName(vehicle.name);
    setEditedBrand(vehicle.brand);
    setEditedYear(vehicle.year);
    setEditedPhoto(vehicle.photo);
    setEditModalVisible(true);
  };

  const handleEditImage = async () => {
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
      setEditedPhoto(result.uri);
    }
  };

  const handleSaveEdit = async () => {
    if (editedName && editedBrand && editedYear && selectedVehicle) {
      Alert.alert(
        'Confirmação',
        'Tem certeza que deseja editar as informações do veículo?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Confirmar',
            onPress: async () => {
              try {
                await updateDoc(doc(db, 'vehicles', selectedVehicle.id), {
                  name: editedName,
                  brand: editedBrand,
                  year: editedYear,
                  photo: editedPhoto,
                });
                setEditModalVisible(false);
                Alert.alert('Veículo atualizado com sucesso.');
              } catch (error) {
                console.error('Erro ao atualizar veículo:', error);
              }
            },
          },
        ],
        { cancelable: true }
      );
    }
  };

  const handleDeleteVehicle = (vehicle) => {
    Alert.alert(
      'Confirmação de Exclusão',
      'Tem certeza que deseja excluir o veículo?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => deleteVehicle(vehicle),
        },
      ],
      { cancelable: true }
    );
  };

const deleteVehicle = async (vehicle) => {
    try {
      await deleteDoc(doc(db, 'vehicles', vehicle.id));
      Alert.alert('Veículo excluído com sucesso.');
    } catch (error) {
      console.error('Erro ao excluir veículo:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={vehicles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.photo }} style={styles.vehicleImage} />
            <Text style={styles.nameText}>Nome: {item.name}</Text>
            <Text style={styles.infoText}>Marca: {item.brand}</Text>
            <Text style={styles.infoText}>Ano: {item.year}</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => handleEditVehicle(item)}
            >
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteVehicle(item)}
            >
              <Text style={styles.buttonText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Modal de edição */}
      <Modal
        visible={editModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Veículo</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome"
              value={editedName}
              onChangeText={setEditedName}
            />
            <TextInput
              style={styles.input}
              placeholder="Marca"
              value={editedBrand}
              onChangeText={setEditedBrand}
            />
            <TextInput
              style={styles.input}
              placeholder="Ano"
              value={editedYear}
              onChangeText={setEditedYear}
            />
            <TouchableOpacity
              style={styles.editImageButton}
              onPress={handleEditImage}
            >
              
              <Ionicons name="image-outline" size={20} color="white" />
              <Text style={styles.buttonText}>Galeria</Text>
            </TouchableOpacity>
            {editedPhoto && (
              <Image
                source={{ uri: editedPhoto }}
                style={styles.editedImage}
              />
            )}

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveEdit}
              >
                <Text style={styles.buttonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    padding: 16,
  },
  itemContainer: {
    marginBottom: 16,
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
  },
  vehicleImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  infoText: {
    fontSize: 14,
    marginTop: 4,
    color: '#888',
  },
  editButton: {
    backgroundColor: '#1C3C6C',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    marginTop: 8,
  },
  deleteButton: {
    backgroundColor: '#D62828',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#F9F9F9',
    borderRadius: 4,
    padding: 8,
    marginBottom: 12,
    width: '100%',
  },
  editImageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C3C6C',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    marginTop: 8,
  },
  cameraIcon: {
    width: 16,
    height: 16,
    marginLeft: 8,
    
  },
  editedImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 8,
  },
  confirmationText: {
    fontSize: 16,
    marginTop: 8,
    marginBottom: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#D62828',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    marginHorizontal: 8,
  },
  saveButton: {
    backgroundColor: '#1C3C6C',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    marginHorizontal: 8,
  },
});

export default VehicleEdit;
 