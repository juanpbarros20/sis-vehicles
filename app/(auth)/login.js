import React, { useRef, useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { AuthStore, appSignIn } from "../../store.js";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, signInWithPopup, GoogleAuthProvider  } from "firebase/auth";

export default function LogIn() {
  const router = useRouter();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onLogin = async () => {
    const email = emailRef.current;
    const password = passwordRef.current;

    setLoading(true);
    setError("");

    try {
      const resp = await appSignIn(email, password);

      if (resp?.user) {
        router.replace("/(tabs)/home");
      } else {
        throw new Error(resp.error?.message);
      }
    } catch (error) {
      console.log(error);
      setError(
        "Erro ao fazer login. Verifique suas credenciais e tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  const onCreateAccount = () => {
    AuthStore.update((s) => {
      s.isLoggedIn = true;
    });
    router.push("/create-account");
  };

  const onRecover = () => {
    AuthStore.update((s) => {
      s.isLoggedIn = true;
    });
    router.push("/recoverPassword");
  };

  const signInWithGoogle = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;

      console.log("Usuário autenticado com sucesso:", user);
    } catch (error) {
      console.error("Erro ao autenticar com o Google:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Faça login na sua conta</Text>
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

      <View>
        <TouchableOpacity>
          <Text style={styles.recoverText} onPress={onRecover}>
            Esqueci minha senha!
          </Text>
        </TouchableOpacity>
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={onLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.registerButton} onPress={onCreateAccount}>
        <Text style={styles.registerButtonText}>Registrar-se</Text>
      </TouchableOpacity>
      <View style={styles.separator}>
        <Text style={styles.separatorText}>Ou continue com</Text>
      </View>
      <View style={styles.socialButtons}>
        <TouchableOpacity style={styles.socialButton} onPress={signInWithGoogle}>
          <Ionicons name="logo-google" color="#1C3C6C" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1C3C6C",
    marginBottom: 20,
  },
  label: {
    marginBottom: 4,
    color: "#1C3C6C",
    fontSize: 16,
    marginTop: 14,
  },
  textInput: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#1C3C6C",
    paddingHorizontal: 8,
    marginBottom: 6,
    color: "#1C3C6C",
  },
  button: {
    backgroundColor: "#1C3C6C",
    paddingVertical: 20,
    borderRadius: 8,
    marginBottom: 8,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  recoverText: {
    color: "#1C3C6C",
    fontSize: 16,
    left: 70,
    marginTop: 6,
    marginBottom: 15,
  },
  registerButton: {
    borderWidth: 1,
    borderColor: "#1C3C6C",
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 16,
    width: 300,
  },
  registerButtonText: {
    color: "#1C3C6C",
    fontSize: 16,
    textAlign: "center",
  },
  error: {
    color: "red",
    fontSize: 14,
    marginBottom: 8,
    textAlign: "center",
  },
  separator: {
    marginTop: 16,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  separatorText: {
    color: "#1C3C6C",
    fontSize: 16,
    marginHorizontal: 8,
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  socialButton: {
    borderWidth: 1,
    borderColor: "#1C3C6C",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
});
