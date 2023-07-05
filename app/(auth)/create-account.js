import React, { useRef, useState } from "react";
import { Text, View, TextInput, StyleSheet, Alert, TouchableOpacity, ActivityIndicator } from "react-native";
import { AuthStore, appSignUp } from "../../store.js";
import { Stack, useRouter } from "expo-router";

export default function CreateAccount() {
  const router = useRouter();
  const emailRef = useRef("");
  const nicknameRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");
  const [loading, setLoading] = useState(false); // Estado para controlar o carregamento

  const onSaveUser = async () => {
    const email = emailRef.current;
    const nickname = nicknameRef.current;
    const password = passwordRef.current;
    const confirmPassword = confirmPasswordRef.current;

    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem. Por favor, tente novamente.");
      return;
    }

    setLoading(true); // Ativar o indicador de loading

    const resp = await appSignUp(email, password, nickname);
    if (resp?.user) {
      router.replace("/(tabs)/home");
    } else {
      console.log(resp.error);
      const errorMessage = getErrorMessage(resp.error);
      Alert.alert("Erro ao cadastrar", errorMessage);
    }

    setLoading(false); // Desativar o indicador de loading
  };

  const onCancel = () => {
    AuthStore.update((s) => {
      s.isLoggedIn = false;
    });
    router.back();
  };

  const getErrorMessage = (error) => {
    switch (error.code) {
      case "auth/email-already-in-use":
        return "O email fornecido já está em uso. Por favor, tente outro email.";
      case "auth/invalid-email":
        return "O email fornecido é inválido. Por favor, verifique e tente novamente.";
      case "auth/weak-password":
        return "A senha fornecida é muito fraca. Por favor, escolha uma senha mais segura.";
      default:
        return "Ocorreu um erro ao cadastrar. Por favor, tente novamente mais tarde.";
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crie sua conta!</Text>
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
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Apelido</Text>
        <TextInput
          placeholder="Digite seu apelido"
          placeholderTextColor="#999"
          nativeID="nickname"
          onChangeText={(text) => {
            nicknameRef.current = text;
          }}
          style={styles.textInput}
        />
      </View>
      <View style={styles.inputContainer}>
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
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirmar Senha</Text>
        <TextInput
          placeholder="Confirme sua senha"
          placeholderTextColor="#999"
          secureTextEntry={true}
          nativeID="confirmPassword"
          onChangeText={(text) => {
            confirmPasswordRef.current = text;
          }}
          style={styles.textInput}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={onSaveUser} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Cadastrar</Text>
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
