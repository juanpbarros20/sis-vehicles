import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../src/firebase.config";
import { useRouter } from "expo-router";


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    function newUser () {
        router.replace('./newUser')
    }

    function replacePass () {
        router.replace('./replacePass')
    }

    function UserLogin() {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                router.replace('/home');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
            })
    }


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>Acesse aqui</Text>
                    <Text style={styles.subtitle}>Bem-vindo de volta, você fez falta!</Text>
                </View>
                <View style={styles.inputs}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#888"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#888"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>
                <TouchableOpacity onPress={replacePass}>
                    <Text style={styles.forgotPassword}>Esqueceu sua senha?</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={UserLogin} style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>Entrar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={newUser}>
                    <Text style={styles.createAccount}>Criar nova conta</Text>
                </TouchableOpacity>
                <View style={styles.separator}>
                    <Text style={styles.separatorText}>Ou continue com</Text>
                </View>
                <View style={styles.socialButtons}>
                    <TouchableOpacity style={styles.socialButton}>
                        <Ionicons name="logo-google" color="#000000" size={24} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 16,
    },
    header: {
        alignItems: "center",
        marginTop: 32,
    },
    title: {
        fontSize: 24,
        color: "#1C3C6C",
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 18,
        maxWidth: "60%",
        textAlign: "center",
    },
    inputs: {
        marginVertical: 16,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: "#000000",
        marginBottom: 16,
        paddingVertical: 8,
    },
    forgotPassword: {
        fontSize: 14,
        color: "#1C3C6C",
        alignSelf: "flex-end",
    },
    loginButton: {
        padding: 16,
        backgroundColor: "#1C3C6C",
        marginVertical: 24,
        borderRadius: 8,
        shadowColor: "#1C3C6C",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    loginButtonText: {
        color: "#FFFFFF",
        textAlign: "center",
        fontSize: 18,
    },
    createAccount: {
        padding: 8,
        color: "#1C3C6C",
        textAlign: "center",
        fontSize: 14,
    },
    separator: {
        marginVertical: 24,
    },
    separatorText: {
        color: "#1C3C6C",
        textAlign: "center",
        fontSize: 14,
    },
    socialButtons: {
        flexDirection: "row",
        justifyContent: "center",
    },
    socialButton: {
        padding: 8,
        backgroundColor: "#CCCCCC",
        borderRadius: 4,
        marginHorizontal: 8,
    },
});
