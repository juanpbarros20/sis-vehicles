import React, { useState } from "react";
import { useRouter } from "expo-router";
import { Dimensions, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";


const { height } = Dimensions.get("window");

export default function Welcome() {
    const router = useRouter ();

    function Login () {
        router.replace('./login')
    }

    function NewUser () {
        router.replace('./newUser')
    }

  return (
    <SafeAreaView>
      <View>
        <ImageBackground
          style={{
            height: height / 2,
            
          }}
          resizeMode="contain"
          source={require("../assets/images/welcome-img.png")}
        />
        <View
          style={{
            paddingHorizontal: 16,
            paddingTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: 29,
              color: "#1C3C6C",
              textAlign: "center",
            }}
          >
            Gerenciamento simplificado de veículos
          </Text>

          <Text
            style={{
              fontSize: 15,
              color: "black",
              textAlign: "center",
              marginTop: 12,
            }}
          >
            Gestão de veículos de forma profissional e localização em tempo real.
          </Text>
        </View>
        <View
          style={{
            paddingHorizontal: 8,
            paddingTop: 70,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={Login}
            style={{
              backgroundColor: "#1C3C6C",
              paddingVertical: 12,
              paddingHorizontal: 16,
              width: "48%",
              borderRadius: 4,
              shadowColor: "#1C3C6C",
              shadowOffset: {
                width: 0,
                height: 8,
              },
              shadowOpacity: 0.3,
              shadowRadius: 8,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 18,
                textAlign: "center",
              }}
            >
              Autenticar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={NewUser}
            style={{
              paddingVertical: 12,
              paddingHorizontal: 16,
              width: "48%",
              borderRadius: 4,
            }}
          >
            <Text
              style={{
                color: "black",
                fontSize: 18,
                textAlign: "center",
              }}
            >
              Registrar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
