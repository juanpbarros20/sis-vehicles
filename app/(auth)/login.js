import React, { useRef } from "react";
import { Text, View, TextInput, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { AuthStore, appSignIn } from "../../store.js";
import { Stack, useRouter } from "expo-router";

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
          placeholder="Enter your email"
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
        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="Enter your password"
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
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.createAccountText} onPress={onCreateAccount}>
        Create Account
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
    borderBottomWidth: 1,
    borderColor: "#1C3C6C",
    marginBottom: 16,
    paddingVertical: 8,
    fontSize: 16,
  },
  textInput: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#1C3C6C",
    paddingHorizontal: 8,
    marginBottom: 8,
    color: "#1C3C6C",
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
    fontSize: 16,
    color: "#1C3C6C",
  },
});
