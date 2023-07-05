import React from "react";
import { Link, Redirect, Stack, useRouter } from "expo-router";
import { View, Text, TouchableOpacity, SafeAreaView, Alert, StyleSheet } from "react-native";
import UserAvatar from 'react-native-user-avatar';
import { AuthStore, appSignOut } from "../../../store";

const Tab2Index = () => {
  const router = useRouter();
  const user = AuthStore.getRawState().user;
  const displayName = user?.displayName;
  const email = user?.email;

  const [showLogoutButton, setShowLogoutButton] = React.useState(false);

  const handleSignOut = async () => {
    const resp = await appSignOut();
    if (!resp?.error) {
      router.replace("/(auth)/login");
    } else {
      console.log(resp.error);
      Alert.alert("Logout Error", resp.error?.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false, title: "Settings" }} />

      <TouchableOpacity
        style={styles.avatarContainer}
        onPress={() => setShowLogoutButton(!showLogoutButton)}
      >
        <UserAvatar
          onPress={handleSignOut}
          name={displayName}
          email={email}
          size={60} // Reduzindo o tamanho do avatar
          
        />
      </TouchableOpacity>

      {showLogoutButton && (
        <View style={styles.logoutButtonContainer}>
          <Text style={styles.emailText}>{email}</Text>
          <Text style={styles.displayNameText}>{displayName}</Text>
          
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleSignOut}
          >
            <Text style={styles.logoutButtonText}>Sair</Text>
          </TouchableOpacity>


        </View>
      )}

      {!showLogoutButton && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.replace("/settings/newCar")}
          >
            <Text style={styles.buttonText}>Novo veículo</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end', // Alinhar no canto superior direito
  },
  avatarContainer: {
    marginTop: 30, // Reduzindo o espaço acima do avatar
    right: 10
  },
  logoutButtonContainer: {
    marginTop: 10,
    right: 15,
    alignItems: 'center', // Centralizar horizontalmente
  },
  logoutButton: {
    backgroundColor: '#1C3C6C',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: '#fff',
    fontFamily: "EncodeSansSemiCondensed_400Regular",
    fontSize: 16,
  },
  emailText: {
    fontFamily: "EncodeSansSemiCondensed_400Regular",
    marginTop: 8,
  },
  displayNameText: {
    fontFamily: "EncodeSansSemiCondensed_700Bold",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
    alignItems: 'center', // Centralizar horizontalmente
  },
  button: {
    backgroundColor: '#1C3C6C',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    right: 10
  },
  buttonText: {
    color: '#fff',
    fontFamily: "EncodeSansSemiCondensed_400Regular",
    fontSize: 16,
  },
});

export default Tab2Index;
