import React, { useRef, useState } from "react";
import { Text, View, TextInput, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { AuthStore, appSignIn } from "../../store.js";
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LogIn() {
  const router = useRouter();
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const onLogin = async () => {
    const email = emailRef.current;
    const password = passwordRef.current;

    const resp = await appSignIn(email, password);
    if (resp?.user) {
      router.replace("/(tabs)/home");
    } else {
      console.log(resp.error);
      Alert.alert("Login Error", resp.error?.message);
    }
  };

  const onCreateAccount = () => {
    AuthStore.update((s) => {
      s.isLoggedIn = true;
    });
    router.push("/create-account");
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Digite seu email"
          placeholderTextColor="#999"
          autoCapitalize="none"
          nativeID="email"
          onChangeText={(text) => {
            emailRef.current = text;
          }}
          style={styles.textInput}
        />
      </View>
      <View>
        <Text style={styles.label}>Senha</Text>
        <TextInput
          placeholder="Digite sua senha"
          placeholderTextColor="#999"
          secureTextEntry={true}
          nativeID="password"
          onChangeText={(text) => {
            passwordRef.current = text;
          }}
          style={styles.textInput}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={onLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <Text style={styles.createAccountText} onPress={onCreateAccount}>
        Registrar-se
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    borderColor: "#1C3C6C",
    marginBottom: 4,
    fontSize: 16,
    marginVertical: 18
  },
  textInput: {
    
    width: 300,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#1C3C6C",
    paddingHorizontal: 8,
    marginBottom: 8,
    color: "black",
  },
  button: {
    backgroundColor: "#1C3C6C",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    width: 300,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  createAccountText: {
    fontSize: 14,
    color: "#1C3C6C",
  },
});
