import React, { useRef, useState } from "react";
import { Text, View, TextInput, StyleSheet, Alert, TouchableOpacity, ActivityIndicator } from "react-native";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { AuthStore } from "../../store.js";
import { useRouter } from "expo-router";

const auth = getAuth(); 

export default function PasswordRecovery() {
  const router = useRouter();
  const emailRef = useRef("");
  const [loading, setLoading] = useState(false);

  const handlePasswordRecovery = async () => {
    const email = emailRef.current;

    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert("Sucesso", "Um email de recuperação foi enviado para o seu endereço de email.");
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Ocorreu um erro ao enviar o email de recuperação. Por favor, verifique o endereço de email fornecido.");
    }

    setLoading(false);
  };

  const onCancel = () => {
    AuthStore.update((s) => {
      s.isLoggedIn = false;
    });
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperação de Senha</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Digite seu email"
          placeholderTextColor="#999"
          nativeID="email"
          onChangeText={(text) => {
            emailRef.current = text;
          }}
          style={styles.textInput}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handlePasswordRecovery} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Recuperar Senha</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
        <Text style={styles.cancelButtonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 32,
    color: "#1C3C6C",
  },
  inputContainer: {
    marginBottom: 16,
    width: "100%",
  },
  label: {
    marginBottom: 4,
    color: "#1C3C6C",
    fontSize: 16,
  },
  textInput: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#1C3C6C",
    paddingHorizontal: 8,
    color: "#1C3C6C",
  },
  button: {
    backgroundColor: "#1C3C6C",
    paddingVertical: 20,
    borderRadius: 8,
    marginBottom: 10,
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: "#1C3C6C",
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 16,
    width: "100%",
  },
  cancelButtonText: {
    color: "#1C3C6C",
    fontSize: 16,
    textAlign: "center",
  },
});
