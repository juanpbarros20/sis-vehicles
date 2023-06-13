import { Text, View, TextInput, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { AuthStore, appSignIn } from "../../store.js";
import { Stack, useRouter } from "expo-router";
import { useRef } from "react";

export default function LogIn() {
  const router = useRouter();
  const emailRef = useRef("");
  const passwordRef = useRef("");

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View>
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder=" "
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
          placeholder=" "
          secureTextEntry={true}
          nativeID="password"
          onChangeText={(text) => {
            passwordRef.current = text;
          }}
          style={styles.textInput}
        />
      </View>
      <TouchableOpacity style={styles.button}>
      <Text
        onPress={async () => {
          const resp = await appSignIn(emailRef.current, passwordRef.current);
          if (resp?.user) {
            router.replace("/(tabs)/home");
           
          } else {
            console.log(resp.error)
            Alert.alert("Login Error", resp.error?.message)
          }
        }}
        style={styles.buttonText}
      >
        Login
      </Text>
      </TouchableOpacity>
      <Text
        onPress={() => {
          AuthStore.update((s) => {
            s.isLoggedIn = true;
          });
          router.push("/create-account");
        }}
      >
        Create Account
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    borderBottomWidth: 1,
    borderColor: '#1C3C6C',
    marginBottom: 16,
    paddingVertical: 8,
    fontSize: 16,
  },
  textInput: {
    width: 250,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#1C3C6C",
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#1C3C6C',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  }
});