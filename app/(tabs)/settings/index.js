import React from "react";
import { Link, Redirect, Stack, useRouter } from "expo-router";
import { View, Text, TouchableOpacity, SafeAreaView, Alert, StyleSheet } from "react-native";
import UserAvatar from 'react-native-user-avatar';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AntDesign } from '@expo/vector-icons';
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

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.avatarContainer}
          onPress={() => setShowLogoutButton(!showLogoutButton)}
        >
          <UserAvatar
            onPress={handleSignOut}
            name={displayName}
            email={email}
            size={40}
          />
        </TouchableOpacity>
      </View>

      {showLogoutButton && (
        <View style={styles.logoutButtonContainer}>
          <Text style={styles.displayNameText}>{displayName}</Text>
          <Text style={styles.emailText}>{email}</Text>
          
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleSignOut}
          >
            <AntDesign name="logout" style={styles.logoutButtonIcon} />
            <Text style={styles.logoutButtonText}>Sair</Text>
          </TouchableOpacity>
        </View>
      )}

      {!showLogoutButton && (
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.replace("/settings/newCar")}
          >
            <Icon name="car" size={20} color="#1C3C6C" style={styles.menuIcon} />
            <Text style={styles.menuText}>Novo veículo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.replace("/vehicle/vehicleEdit")}
          >
            <Icon name="edit" size={20} color="#1C3C6C" style={styles.menuIcon} />
            <Text style={styles.menuText}>Editar veículo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.replace("/settings/reports")}
          >
            <Icon name="file" size={20} color="#1C3C6C" style={styles.menuIcon} />
            <Text style={styles.menuText}>Relatórios</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.replace("/settings/account")}
          >
            <Icon name="cog" size={20} color="#1C3C6C" style={styles.menuIcon} />
            <Text style={styles.menuText}>Ajuste de conta</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'flex-end',
    marginTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  avatarContainer: {
    marginRight: 30,
    right: 10
  },
  logoutButtonContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 10,

  },
  logoutButton: {
    marginTop: 8,
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,

  },
  logoutButtonText: {
    color: '#fff',
    fontFamily: 'EncodeSansSemiCondensed_400Regular',
    fontSize: 16,
  },
  logoutButtonIcon: {
    color: '#fff',
    fontSize: 16,
    marginRight: 5,
  },
  
  displayNameText: {
    fontFamily: "EncodeSansSemiCondensed_700Bold",
  },
  emailText: {
    fontFamily: "EncodeSansSemiCondensed_400Regular",
  },
  menuContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },
  menuIcon: {
    marginRight: 8,
  },
  menuText: {
    fontSize: 16,
    color: '#1C3C6C',
  },
});

export default Tab2Index;
