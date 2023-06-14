import React, { useRef } from "react";
import { Text, View, TextInput, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { AuthStore, appSignUp } from "../../store.js";
import { Stack, useRouter } from "expo-router";

export default function CreateAccount() {
  const router = useRouter();
  const emailRef = useRef("");
  const firstNameRef = useRef("");
  const lastNameRef = useRef("");
  const passwordRef = useRef("");

  const onSaveUser = async () => {
    const email = emailRef.current;
    const firstName = firstNameRef.current;
    const lastName = lastNameRef.current;
    const password = passwordRef.current;

    const resp = await appSignUp(email, password, `${firstName} ${lastName}`);
    if (resp?.user) {
      router.replace("/(tabs)/home");
    } else {
      console.log(resp.error);
      Alert.alert("Sign Up Error", resp.error?.message);
    }
  };

  const onCancel = () => {
    AuthStore.update((s) => {
      s.isLoggedIn = false;
    });
    router.back();
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Enter your email"
          placeholderTextColor="#999"
          nativeID="email"
          onChangeText={(text) => {
            emailRef.current = text;
          }}
          style={styles.textInput}
        />
      </View>
      <View>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          placeholder="Enter your first name"
          placeholderTextColor="#999"
          nativeID="firstName"
          onChangeText={(text) => {
            firstNameRef.current = text;
          }}
          style={styles.textInput}
        />
      </View>
      <View>
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          placeholder="Enter your last name"
          placeholderTextColor="#999"
          nativeID="lastName"
          onChangeText={(text) => {
            lastNameRef.current = text;
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
      <TouchableOpacity style={styles.button} onPress={onSaveUser}>
        <Text style={styles.buttonText}>SAVE NEW USER</Text>
      </TouchableOpacity>
      <Text style={styles.cancelText} onPress={onCancel}>
        CANCEL
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
    marginBottom: 4,
    color: "#1C3C6C",
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
  cancelText: {
    fontSize: 16,
    color: "#1C3C6C",
  },
});
