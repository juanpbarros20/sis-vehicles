import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getAuth } from "firebase/auth";



export default function NewUser() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const router = useRouter ();

    function Login () {
        router.replace('./login')
    }

    function newUser() {
        if (name.length === 0) {
            alert("Please enter a name");
        } else if (email.length === 0) {
            alert("Please enter an email");
        } else if (password.length === 0) {
            alert("Please enter a password");
        } else if (confirmPass.length === 0) {
            alert("Please enter a confirm password");
        } else if (password !== confirmPass) {
            alert("Confirm password does not match");
        } else {
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    alert('O usuario ' + email + ' foi cadastrado. Faça o Login!');
                    router.replace('/');
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    alert(errorMessage);
                    router.replace('/');
                });
        }
    };


    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.headingContainer}>
                    <Text style={styles.headingText}>Crie uma nova conta</Text>
                    <Text style={styles.subheadingText}>Crie sua conta para acessar todas as funcionalidades</Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        placeholderTextColor="#888"
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#888"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCompleteType="email"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#888"
                        value={password}
                        autoCapitalize="none"
                        secureTextEntry
                        onChangeText={setPassword}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        placeholderTextColor="#888"
                        value={confirmPass}
                        autoCapitalize="none"
                        secureTextEntry
                        onChangeText={setConfirmPass}
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={newUser}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.link} onPress={Login} >
                    <Text style={styles.linkText}>Já possui conta? Faça o Login</Text>
                </TouchableOpacity>
                <View style={styles.orContainer}>
                    <Text style={styles.orText}>Ou continue com</Text>
                    <TouchableOpacity style={styles.socialButton}>
                        <Ionicons name="logo-google" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    headingContainer: {
        alignItems: 'center',
        marginBottom: 32,
    },
    headingText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    subheadingText: {
        fontSize: 16,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 32,
    },
    input: {
        borderBottomWidth: 1,
        borderColor: 'gray',
        marginBottom: 16,
        paddingVertical: 8,
        fontSize: 16,
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
    },
    link: {
        marginBottom: 32,
    },
    linkText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#1C3C6C',
    },
    orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    orText: {
        fontSize: 16,
        marginRight: 8,
    },
    socialButton: {
        backgroundColor: 'gray',
        borderRadius: 16,
        padding: 8,
    },
});
