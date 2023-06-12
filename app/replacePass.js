import React from 'react';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRouter } from "expo-router";
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../src/firebase.config';

export default function ReplacePass() {
    const [email, setEmail] = useState('');
    const router = useRouter ();

    function replacePass(){
        if(email !== '') {
            sendPasswordResetEmail(auth, email)
            .then(() => {
                alert("Foi enviado um e-mail para: " + email + ". Verifique sua caixa de e-mail.");
                router.replace('./login')
            })
            .catch((error) => {
                const errorMessage = error.message;
            })
        } else {
            alert("E preciso informar um email valido");
            alert("Ops! Alguma coisa não deu certo. " + errorMessage + ". Tente novamente ou pressione voltar.");
            return;
        }
    }

    function Login () {
        router.replace('./login')
    }
    return (
        <SafeAreaView>
          <View style={styles.container}>
            <View style={styles.headingContainer}>
              <Text style={styles.headingText}>Esqueceu a Senha?</Text>
              <Text style={styles.subheadingText}>Sua senha será enviada para o e-mail registrado!</Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
               style={styles.input}
               placeholder="Informe o E-mail"
               placeholderTextColor="#888"
               value={email}
               onChangeText={setEmail}
               keyboardType="email-address"
               autoCapitalize="none"
               autoCompleteType="email"
               />
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={replacePass}
            >
              <Text style={styles.buttonText}>Recuperar</Text>
            </TouchableOpacity>
            <View>
            <TouchableOpacity
              style={styles.returnButton}
              onPress={Login}
            >
              <Text style={styles.returnText}>Voltar</Text>
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
      returnButton: {
        backgroundColor: '#d3d3d3',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
      },
      returnText: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center',
      }
    });
    